import React, { createContext, useContext, useState, useCallback } from 'react';

// 1. Базовое использование useContext
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemedButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className={`px-4 py-2 rounded ${
        theme === 'light' 
          ? 'bg-gray-800 text-white' 
          : 'bg-yellow-400 text-gray-800'
      }`}
    >
      Переключить на {theme === 'light' ? 'темную' : 'светлую'} тему
    </button>
  );
};

const ThemedCard: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`p-4 rounded border ${
      theme === 'light' 
        ? 'bg-white text-gray-800 border-gray-300' 
        : 'bg-gray-800 text-white border-gray-600'
    }`}>
      <h4 className="font-bold mb-2">Карточка</h4>
      <p>Текущая тема: {theme}</p>
    </div>
  );
};

const BasicUseContext: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="p-4 border rounded">
        <h3 className="text-lg font-bold mb-4">Базовое использование useContext</h3>
        
        <div className="space-y-4">
          <ThemedButton />
          <ThemedCard />
        </div>
      </div>
    </ThemeProvider>
  );
};

// 2. useContext для глобального состояния
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: user !== null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: Date.now(),
      name: name.trim(),
      email: email.trim()
    });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Имя:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Войти
      </button>
    </form>
  );
};

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="p-4 bg-green-100 rounded">
      <h4 className="font-bold mb-2">Профиль пользователя</h4>
      <p>Имя: {user.name}</p>
      <p>Email: {user.email}</p>
      <button 
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-2"
      >
        Выйти
      </button>
    </div>
  );
};

const AuthStatus: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={`p-2 rounded text-sm ${
      isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      Статус: {isAuthenticated ? 'Авторизован' : 'Не авторизован'}
    </div>
  );
};

const GlobalStateExample: React.FC = () => {
  return (
    <AuthProvider>
      <div className="p-4 border rounded mt-4">
        <h3 className="text-lg font-bold mb-4">useContext для глобального состояния</h3>
        
        <div className="space-y-4">
          <AuthStatus />
          <LoginForm />
          <UserProfile />
        </div>
      </div>
    </AuthProvider>
  );
};

// 3. useContext с множественными контекстами
interface LanguageContextType {
  language: 'ru' | 'en';
  setLanguage: (lang: 'ru' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ru: {
    'welcome': 'Добро пожаловать',
    'hello': 'Привет',
    'goodbye': 'До свидания',
    'language': 'Язык'
  },
  en: {
    'welcome': 'Welcome',
    'hello': 'Hello',
    'goodbye': 'Goodbye',
    'language': 'Language'
  }
};

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');

  const t = useCallback((key: string) => {
    return translations[language][key as keyof typeof translations.ru] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center gap-2">
      <span>Язык:</span>
      <button 
        onClick={() => setLanguage('ru')}
        className={`px-3 py-1 rounded text-sm ${
          language === 'ru' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        RU
      </button>
      <button 
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-sm ${
          language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        EN
      </button>
    </div>
  );
};

const TranslatedContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-3 bg-blue-50 rounded">
      <h4 className="font-bold mb-2">{t('welcome')}</h4>
      <p>{t('hello')}, мир!</p>
      <p>{t('goodbye')}!</p>
    </div>
  );
};

const MultipleContextsExample: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="p-4 border rounded mt-4">
          <h3 className="text-lg font-bold mb-4">useContext с множественными контекстами</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <ThemedButton />
              <LanguageSwitcher />
            </div>
            <ThemedCard />
            <TranslatedContent />
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

// 4. useContext для настроек приложения
interface SettingsContextType {
  settings: {
    notifications: boolean;
    sound: boolean;
    autoSave: boolean;
  };
  updateSetting: (key: keyof SettingsContextType['settings'], value: boolean) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings = {
  notifications: true,
  sound: false,
  autoSave: true
};

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSetting = useCallback((key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

const SettingsPanel: React.FC = () => {
  const { settings, updateSetting, resetSettings } = useSettings();

  return (
    <div className="p-4 bg-gray-50 rounded">
      <h4 className="font-bold mb-3">Настройки</h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Уведомления</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => updateSetting('notifications', e.target.checked)}
            className="w-4 h-4"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span>Звук</span>
          <input
            type="checkbox"
            checked={settings.sound}
            onChange={(e) => updateSetting('sound', e.target.checked)}
            className="w-4 h-4"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span>Автосохранение</span>
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => updateSetting('autoSave', e.target.checked)}
            className="w-4 h-4"
          />
        </div>
      </div>
      
      <button 
        onClick={resetSettings}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-3"
      >
        Сбросить настройки
      </button>
    </div>
  );
};

const SettingsConsumer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="p-3 bg-green-50 rounded">
      <h4 className="font-bold mb-2">Текущие настройки</h4>
      <ul className="text-sm space-y-1">
        <li>Уведомления: {settings.notifications ? 'Включены' : 'Отключены'}</li>
        <li>Звук: {settings.sound ? 'Включен' : 'Отключен'}</li>
        <li>Автосохранение: {settings.autoSave ? 'Включено' : 'Отключено'}</li>
      </ul>
    </div>
  );
};

const SettingsExample: React.FC = () => {
  return (
    <SettingsProvider>
      <div className="p-4 border rounded mt-4">
        <h3 className="text-lg font-bold mb-4">useContext для настроек приложения</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingsPanel />
          <SettingsConsumer />
        </div>
      </div>
    </SettingsProvider>
  );
};

// 5. useContext vs props drilling
const DeepComponent: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div className={`p-2 rounded text-sm ${
      theme === 'light' ? 'bg-gray-100' : 'bg-gray-800 text-white'
    }`}>
      Глубоко вложенный компонент (через props)
    </div>
  );
};

const DeepComponentWithContext: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`p-2 rounded text-sm ${
      theme === 'light' ? 'bg-gray-100' : 'bg-gray-800 text-white'
    }`}>
      Глубоко вложенный компонент (через context)
    </div>
  );
};

const MiddleComponent: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div className="p-2 border border-dashed">
      <p>Промежуточный компонент</p>
      <DeepComponent theme={theme} />
    </div>
  );
};

const MiddleComponentWithContext: React.FC = () => {
  return (
    <div className="p-2 border border-dashed">
      <p>Промежуточный компонент</p>
      <DeepComponentWithContext />
    </div>
  );
};

const PropsDrillingExample: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeProvider>
      <div className="p-4 border rounded mt-4">
        <h3 className="text-lg font-bold mb-4">useContext vs Props Drilling</h3>
        
        <div className="mb-4">
          <button 
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Переключить тему (props drilling)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2 text-red-800">Props Drilling:</h4>
            <MiddleComponent theme={theme} />
          </div>
          <div>
            <h4 className="font-bold mb-2 text-green-800">useContext:</h4>
            <MiddleComponentWithContext />
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded">
          <p className="text-sm text-gray-700">
            <strong>Наблюдение:</strong> При props drilling нужно передавать данные через все промежуточные компоненты. 
            С useContext данные доступны напрямую в любом компоненте.
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

// Основной компонент
const UseContextPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика useContext</h1>
      
      <div className="space-y-6">
        <BasicUseContext />
        <GlobalStateExample />
        <MultipleContextsExample />
        <SettingsExample />
        <PropsDrillingExample />
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты useContext:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>useContext позволяет передавать данные через дерево компонентов без props drilling</li>
          <li>Создавайте контекст с помощью createContext</li>
          <li>Оборачивайте компоненты в Provider для предоставления данных</li>
          <li>Используйте useContext в дочерних компонентах для получения данных</li>
          <li>Проверяйте, что контекст не undefined</li>
          <li>Подходит для глобального состояния, тем, языков, аутентификации</li>
          <li>Может вызывать лишние рендеры - используйте useMemo и useCallback в Provider</li>
        </ul>
      </div>
    </div>
  );
};

export default UseContextPractice; 