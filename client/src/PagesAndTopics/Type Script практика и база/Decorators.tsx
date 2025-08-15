import React from 'react';

// 1. Декораторы классов
function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = 'new property';
    hello = 'override';
  };
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

function logger<T extends { new (...args: any[]): {} }>(constructor: T) {
  console.log('Class created:', constructor.name);
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log('Instance created for:', constructor.name);
    }
  };
}

// 2. Декораторы методов
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };
  
  return descriptor;
}

function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} took ${end - start} milliseconds`);
    return result;
  };
  
  return descriptor;
}

function retry(attempts: number = 3) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args: any[]) {
      for (let i = 0; i < attempts; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          if (i === attempts - 1) throw error;
          console.log(`Attempt ${i + 1} failed, retrying...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    };
    
    return descriptor;
  };
}

// 3. Декораторы свойств
function readonly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
  return descriptor;
}

function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalSet = descriptor.set;
  
  descriptor.set = function(value: any) {
    if (value === null || value === undefined) {
      throw new Error(`${propertyKey} cannot be null or undefined`);
    }
    if (originalSet) {
      originalSet.call(this, value);
    }
  };
  
  return descriptor;
}

// 4. Декораторы параметров
function required(target: any, propertyKey: string, parameterIndex: number) {
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata('required', target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata('required', existingRequiredParameters, target, propertyKey);
}

function validateParameters(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    const requiredParameters: number[] = Reflect.getOwnMetadata('required', target, propertyKey) || [];
    
    requiredParameters.forEach(index => {
      if (args[index] === null || args[index] === undefined) {
        throw new Error(`Parameter at index ${index} is required`);
      }
    });
    
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

// 5. Декораторы фабрики
function configurable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
    return descriptor;
  };
}

function enumerable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
    return descriptor;
  };
}

// 6. Декораторы для API
function apiEndpoint(path: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args: any[]) {
      try {
        const response = await fetch(path, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error(`API call to ${path} failed:`, error);
        throw error;
      }
    };
    
    return descriptor;
  };
}

// 7. Декораторы для кэширования
function cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cacheMap = new Map();
  
  descriptor.value = function(...args: any[]) {
    const key = JSON.stringify(args);
    
    if (cacheMap.has(key)) {
      console.log('Returning cached result for:', propertyKey);
      return cacheMap.get(key);
    }
    
    const result = originalMethod.apply(this, args);
    cacheMap.set(key, result);
    console.log('Caching result for:', propertyKey);
    
    return result;
  };
  
  return descriptor;
}

// 8. Декораторы для валидации
function validateEmail(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalSet = descriptor.set;
  
  descriptor.set = function(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }
    if (originalSet) {
      originalSet.call(this, value);
    }
  };
  
  return descriptor;
}

function validateAge(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalSet = descriptor.set;
  
  descriptor.set = function(value: number) {
    if (value < 0 || value > 150) {
      throw new Error('Age must be between 0 and 150');
    }
    if (originalSet) {
      originalSet.call(this, value);
    }
  };
  
  return descriptor;
}

// 9. Практические примеры
@logger
@sealed
class UserService {
  private users: any[] = [];

  @log
  @measure
  async getUser(id: number) {
    // Симуляция API вызова
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.users.find(user => user.id === id);
  }

  @retry(3)
  async createUser(userData: any) {
    // Симуляция API вызова с возможной ошибкой
    if (Math.random() > 0.7) {
      throw new Error('Network error');
    }
    const user = { id: Date.now(), ...userData };
    this.users.push(user);
    return user;
  }

  @apiEndpoint('/api/users')
  async fetchUsers() {
    // Этот метод будет переопределен декоратором
    return [];
  }

  @cache
  expensiveCalculation(n: number): number {
    console.log('Performing expensive calculation...');
    return n * n * n;
  }
}

class User {
  private _email: string = '';
  private _age: number = 0;

  @validateEmail
  set email(value: string) {
    this._email = value;
  }

  get email(): string {
    return this._email;
  }

  @validateAge
  set age(value: number) {
    this._age = value;
  }

  get age(): number {
    return this._age;
  }

  @log
  @validateParameters
  updateProfile(@required name: string, @required email: string, age?: number) {
    console.log('Updating profile:', { name, email, age });
  }

  @configurable(false)
  @enumerable(false)
  get internalId(): string {
    return `user_${Date.now()}`;
  }
}

// 10. Декораторы для React компонентов (симуляция)
function withLoading<T extends { new (...args: any[]): React.Component }>(constructor: T) {
  return class extends constructor {
    state = {
      ...this.state,
      loading: false
    };

    setLoading = (loading: boolean) => {
      this.setState({ loading });
    };

    render() {
      if (this.state.loading) {
        return <div>Loading...</div>;
      }
      return super.render();
    }
  };
}

function withErrorHandling<T extends { new (...args: any[]): React.Component }>(constructor: T) {
  return class extends constructor {
    state = {
      ...this.state,
      error: null
    };

    setError = (error: string | null) => {
      this.setState({ error });
    };

    render() {
      if (this.state.error) {
        return <div>Error: {this.state.error}</div>;
      }
      return super.render();
    }
  };
}

// 11. Демонстрационные функции
const demonstrateDecorators = () => {
  console.log('=== ДЕМОНСТРАЦИЯ ДЕКОРАТОРОВ ===');

  // Создание экземпляра класса с декораторами
  const userService = new UserService();

  // Тестирование декораторов методов
  userService.getUser(1);
  userService.expensiveCalculation(5);
  userService.expensiveCalculation(5); // Должен вернуть кэшированный результат

  // Тестирование декораторов свойств
  const user = new User();
  
  try {
    user.email = 'invalid-email'; // Должно выбросить ошибку
  } catch (error) {
    console.log('Email validation error:', error.message);
  }

  try {
    user.age = 200; // Должно выбросить ошибку
  } catch (error) {
    console.log('Age validation error:', error.message);
  }

  user.email = 'valid@email.com';
  user.age = 25;
  console.log('Valid user:', { email: user.email, age: user.age });

  // Тестирование декораторов параметров
  try {
    user.updateProfile('', '', 30); // Должно выбросить ошибку
  } catch (error) {
    console.log('Parameter validation error:', error.message);
  }

  user.updateProfile('Иван', 'ivan@example.com', 30);

  console.log('Decorators демонстрация завершена');
};

const DecoratorsPractice: React.FC = () => {
  console.log('=== ДЕКОРАТОРЫ TYPESCRIPT ===');
  demonstrateDecorators();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика декораторов TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. Декораторы классов</h2>
          <p className="mb-2">Модификация конструкторов классов</p>
          <p className="text-sm text-gray-600">@logger @sealed class UserService</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. Декораторы методов</h2>
          <p className="mb-2">Логирование, измерение времени, повторные попытки</p>
          <p className="text-sm text-gray-600">@log @measure @retry(3) async getUser()</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Декораторы свойств</h2>
          <p className="mb-2">Readonly, валидация, конфигурация</p>
          <p className="text-sm text-gray-600">@readonly @validate set property()</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Декораторы параметров</h2>
          <p className="mb-2">Валидация обязательных параметров</p>
          <p className="text-sm text-gray-600">updateProfile(@required name: string)</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. Декораторы фабрики</h2>
          <p className="mb-2">Создание декораторов с параметрами</p>
          <p className="text-sm text-gray-600">@configurable(false) @enumerable(false)</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. API декораторы</h2>
          <p className="mb-2">Автоматизация API вызовов</p>
          <p className="text-sm text-gray-600">@apiEndpoint('/api/users')</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Кэширование</h2>
          <p className="mb-2">Кэширование результатов методов</p>
          <p className="text-sm text-gray-600">@cache expensiveCalculation()</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">8. Валидация</h2>
          <p className="mb-2">Валидация email, возраста и других данных</p>
          <p className="text-sm text-gray-600">@validateEmail @validateAge</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Декораторы - это функции, которые модифицируют классы, методы, свойства</li>
          <li>Декораторы классов применяются к конструктору</li>
          <li>Декораторы методов модифицируют поведение функций</li>
          <li>Декораторы свойств работают с геттерами и сеттерами</li>
          <li>Декораторы параметров валидируют аргументы</li>
          <li>Декораторы фабрики создают декораторы с параметрами</li>
          <li>Декораторы полезны для логирования, кэширования, валидации</li>
        </ul>
      </div>
    </div>
  );
};

export default DecoratorsPractice; 