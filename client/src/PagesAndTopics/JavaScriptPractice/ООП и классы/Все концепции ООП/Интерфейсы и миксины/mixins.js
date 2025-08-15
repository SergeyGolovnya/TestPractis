/**
 * Миксины - способ добавления функциональности к классам без наследования.
 * 
 * Синтаксис:
 * const MixinName = (superclass) => class extends superclass {
 *     // новые методы и свойства
 * };
 * 
 * Особенности:
 * - Позволяют добавлять функциональность к любому классу
 * - Не создают иерархию наследования
 * - Можно комбинировать несколько миксинов
 * - Полезны для добавления утилитарных методов
 */

// Пример 1: Базовые миксины
// const LoggerMixin = (superclass) => class extends superclass {
//     log(message) {
//         console.log(`[${this.constructor.name}] ${message}`);
//     }
    
//     error(message) {
//         console.error(`[${this.constructor.name}] ERROR: ${message}`);
//     }
    
//     warn(message) {
//         console.warn(`[${this.constructor.name}] WARNING: ${message}`);
//     }
    
//     info(message) {
//         console.info(`[${this.constructor.name}] INFO: ${message}`);
//     }
// };

// const TimestampMixin = (superclass) => class extends superclass {
//     getTimestamp() {
//         return new Date().toISOString();
//     }
    
//     getCreatedAt() {
//         if (!this._createdAt) {
//             this._createdAt = this.getTimestamp();
//         }
//         return this._createdAt;
//     }
    
//     getAge() {
//         const created = new Date(this.getCreatedAt());
//         const now = new Date();
//         return now - created;
//     }
// };

// class User extends LoggerMixin(TimestampMixin(Object)) {
//     constructor(name, email) {
//         super();
//         this.name = name;
//         this.email = email;
//         this.log(`Пользователь ${name} создан`);
//     }
    
//     updateProfile(data) {
//         this.log('Обновление профиля');
//         Object.assign(this, data);
//         this.info('Профиль обновлен');
//     }
    
//     getInfo() {
//         return {
//             name: this.name,
//             email: this.email,
//             createdAt: this.getCreatedAt(),
//             age: this.getAge()
//         };
//     }
// }

// const user = new User('Иван', 'ivan@example.com');
// user.updateProfile({ name: 'Петр' });
// console.log(user.getInfo());

// Пример 2: Миксины для валидации
// const ValidationMixin = (superclass) => class extends superclass {
//     validateEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }
    
//     validatePhone(phone) {
//         const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
//         return phoneRegex.test(phone);
//     }
    
//     validateAge(age) {
//         return typeof age === 'number' && age >= 0 && age <= 150;
//     }
    
//     validateRequired(value) {
//         return value !== null && value !== undefined && value !== '';
//     }
    
//     validateLength(value, min, max) {
//         if (typeof value !== 'string') return false;
//         return value.length >= min && value.length <= max;
//     }
    
//     validateRange(value, min, max) {
//         return typeof value === 'number' && value >= min && value <= max;
//     }
// };

// const EventEmitterMixin = (superclass) => class extends superclass {
//     constructor(...args) {
//         super(...args);
//         this._events = {};
//     }
    
//     on(event, callback) {
//         if (!this._events[event]) {
//             this._events[event] = [];
//         }
//         this._events[event].push(callback);
//     }
    
//     off(event, callback) {
//         if (this._events[event]) {
//             this._events[event] = this._events[event].filter(cb => cb !== callback);
//         }
//     }
    
//     emit(event, ...args) {
//         if (this._events[event]) {
//             this._events[event].forEach(callback => callback(...args));
//         }
//     }
    
//     once(event, callback) {
//         const onceCallback = (...args) => {
//             callback(...args);
//             this.off(event, onceCallback);
//         };
//         this.on(event, onceCallback);
//     }
// };

// class Form extends ValidationMixin(EventEmitterMixin(Object)) {
//     constructor() {
//         super();
//         this.fields = {};
//         this.errors = {};
//     }
    
//     addField(name, value, validators = []) {
//         this.fields[name] = value;
//         this.validateField(name, validators);
//     }
    
//     validateField(name, validators) {
//         const value = this.fields[name];
//         this.errors[name] = [];
        
//         validators.forEach(validator => {
//             if (!validator.validate(value)) {
//                 this.errors[name].push(validator.message);
//             }
//         });
        
//         if (this.errors[name].length > 0) {
//             this.emit('validationError', name, this.errors[name]);
//         } else {
//             this.emit('validationSuccess', name);
//         }
//     }
    
//     isValid() {
//         return Object.keys(this.errors).every(field => this.errors[field].length === 0);
//     }
    
//     getErrors() {
//         return this.errors;
//     }
// }

// const form = new Form();
// form.on('validationError', (field, errors) => {
//     console.log(`Ошибка в поле ${field}:`, errors);
// });
// form.on('validationSuccess', (field) => {
//     console.log(`Поле ${field} валидно`);
// });

// form.addField('email', 'invalid-email', [
//     { validate: (value) => form.validateEmail(value), message: 'Некорректный email' }
// ]);

// Пример 3: Миксины для работы с данными
// const StorageMixin = (superclass) => class extends superclass {
//     save(key, data) {
//         try {
//             localStorage.setItem(key, JSON.stringify(data));
//             return true;
//         } catch (error) {
//             console.error('Ошибка сохранения:', error);
//             return false;
//         }
//     }
    
//     load(key) {
//         try {
//             const data = localStorage.getItem(key);
//             return data ? JSON.parse(data) : null;
//         } catch (error) {
//             console.error('Ошибка загрузки:', error);
//             return null;
//         }
//     }
    
//     remove(key) {
//         try {
//             localStorage.removeItem(key);
//             return true;
//         } catch (error) {
//             console.error('Ошибка удаления:', error);
//             return false;
//         }
//     }
    
//     clear() {
//         try {
//             localStorage.clear();
//             return true;
//         } catch (error) {
//             console.error('Ошибка очистки:', error);
//             return false;
//         }
//     }
// };

// const CacheMixin = (superclass) => class extends superclass {
//     constructor(...args) {
//         super(...args);
//         this._cache = new Map();
//         this._cacheTimeout = 5 * 60 * 1000; // 5 минут
//     }
    
//     setCache(key, value, timeout = this._cacheTimeout) {
//         this._cache.set(key, {
//             value,
//             timestamp: Date.now(),
//             timeout
//         });
//     }
    
//     getCache(key) {
//         const cached = this._cache.get(key);
//         if (!cached) return null;
        
//         const isExpired = Date.now() - cached.timestamp > cached.timeout;
//         if (isExpired) {
//             this._cache.delete(key);
//             return null;
//         }
        
//         return cached.value;
//     }
    
//     clearCache() {
//         this._cache.clear();
//     }
    
//     getCacheSize() {
//         return this._cache.size;
//     }
    
//     removeExpired() {
//         const now = Date.now();
//         for (const [key, cached] of this._cache.entries()) {
//             if (now - cached.timestamp > cached.timeout) {
//                 this._cache.delete(key);
//             }
//         }
//     }
// };

// class DataManager extends StorageMixin(CacheMixin(Object)) {
//     constructor() {
//         super();
//         this.data = {};
//     }
    
//     async fetchData(url) {
//         // Проверяем кэш
//         const cached = this.getCache(url);
//         if (cached) {
//             return cached;
//         }
        
//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             
//             // Сохраняем в кэш
//             this.setCache(url, data);
//             
//             // Сохраняем в localStorage
//             this.save(url, data);
//             
//             return data;
//         } catch (error) {
//             // Пробуем загрузить из localStorage
//             const saved = this.load(url);
//             if (saved) {
//                 return saved;
//             }
//             throw error;
//         }
//     }
    
//     getData(key) {
//         return this.data[key] || this.load(key);
//     }
    
//     setData(key, value) {
//         this.data[key] = value;
//         this.save(key, value);
//     }
    
//     getStats() {
//         return {
//             cacheSize: this.getCacheSize(),
//             localStorageKeys: Object.keys(localStorage).length,
//             memoryDataKeys: Object.keys(this.data).length
//         };
//     }
// }

// const dataManager = new DataManager();
// dataManager.setData('user', { name: 'Иван', age: 25 });
// console.log(dataManager.getData('user'));
// console.log(dataManager.getStats());

// Пример 4: Миксины для анимации
// const AnimationMixin = (superclass) => class extends superclass {
//     animate(property, from, to, duration = 1000, easing = 'linear') {
//         const startTime = Date.now();
//         const startValue = from;
//         const change = to - from;
        
//         const animate = () => {
//             const elapsed = Date.now() - startTime;
//             const progress = Math.min(elapsed / duration, 1);
//             
//             let easedProgress;
//             switch (easing) {
//                 case 'easeIn':
//                     easedProgress = progress * progress;
//                     break;
//                 case 'easeOut':
//                     easedProgress = 1 - (1 - progress) * (1 - progress);
//                     break;
//                 case 'easeInOut':
//                     easedProgress = progress < 0.5 
//                         ? 2 * progress * progress 
//                         : 1 - 2 * (1 - progress) * (1 - progress);
//                     break;
//                 default:
//                     easedProgress = progress;
//             }
//             
//             const currentValue = startValue + change * easedProgress;
//             this[property] = currentValue;
//             
//             if (progress < 1) {
//                 requestAnimationFrame(animate);
//             } else {
//                 this.emit('animationComplete', property);
//             }
//         };
//         
//         animate();
//     }
    
//     fadeIn(duration = 1000) {
//         this.opacity = 0;
//         this.animate('opacity', 0, 1, duration, 'easeIn');
//     }
    
//     fadeOut(duration = 1000) {
//         this.animate('opacity', 1, 0, duration, 'easeOut');
//     }
    
//     slideIn(direction = 'left', duration = 1000) {
//         const startPositions = {
//             left: { x: -100, y: 0 },
//             right: { x: 100, y: 0 },
//             up: { x: 0, y: -100 },
//             down: { x: 0, y: 100 }
//         };
//         
//         const start = startPositions[direction] || startPositions.left;
//         this.x = start.x;
//         this.y = start.y;
//         
//         this.animate('x', start.x, 0, duration, 'easeOut');
//         this.animate('y', start.y, 0, duration, 'easeOut');
//     }
// };

// const DraggableMixin = (superclass) => class extends superclass {
//     constructor(...args) {
//         super(...args);
//         this.isDragging = false;
//         this.dragStartX = 0;
//         this.dragStartY = 0;
//         this.originalX = 0;
//         this.originalY = 0;
//     }
    
//     enableDragging() {
//         this.on('mousedown', this.startDrag.bind(this));
//         document.addEventListener('mousemove', this.onDrag.bind(this));
//         document.addEventListener('mouseup', this.stopDrag.bind(this));
//     }
    
//     startDrag(event) {
//         this.isDragging = true;
//         this.dragStartX = event.clientX - this.x;
//         this.dragStartY = event.clientY - this.y;
//         this.originalX = this.x;
//         this.originalY = this.y;
//         this.emit('dragStart');
//     }
    
//     onDrag(event) {
//         if (!this.isDragging) return;
//         
//         this.x = event.clientX - this.dragStartX;
//         this.y = event.clientY - this.dragStartY;
//         this.emit('dragMove', this.x, this.y);
//     }
    
//     stopDrag() {
//         if (this.isDragging) {
//             this.isDragging = false;
//             this.emit('dragEnd', this.x, this.y);
//         }
//     }
    
//     disableDragging() {
//         this.off('mousedown');
//         document.removeEventListener('mousemove', this.onDrag);
//         document.removeEventListener('mouseup', this.stopDrag);
//     }
// };

// class UIElement extends AnimationMixin(DraggableMixin(EventEmitterMixin(Object))) {
//     constructor(x, y, width, height) {
//         super();
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.opacity = 1;
//     }
    
//     show() {
//         this.fadeIn();
//     }
    
//     hide() {
//         this.fadeOut();
//     }
    
//     moveTo(x, y, duration = 500) {
//         this.animate('x', this.x, x, duration, 'easeInOut');
//         this.animate('y', this.y, y, duration, 'easeInOut');
//     }
    
//     getPosition() {
//         return { x: this.x, y: this.y };
//     }
    
//     getBounds() {
//         return {
//             x: this.x,
//             y: this.y,
//             width: this.width,
//             height: this.height
//         };
//     }
// }

// const element = new UIElement(100, 100, 200, 150);
// element.on('animationComplete', (property) => {
//     console.log(`Анимация ${property} завершена`);
// });
// element.on('dragEnd', (x, y) => {
//     console.log(`Элемент перетащен в позицию (${x}, ${y})`);
// });

// element.show();
// element.moveTo(300, 200);

/*
Задача:
Создайте систему миксинов для игрового персонажа:

1. Миксины:
   - HealthMixin - управление здоровьем
   - InventoryMixin - управление инвентарем
   - CombatMixin - боевые способности
   - MovementMixin - движение персонажа
   - ExperienceMixin - система опыта и уровней

2. Класс Character, использующий все миксины

3. Демонстрация работы всех миксинов

Реализуйте взаимодействие между миксинами через события.
*/

// Ваше решение:

// const HealthMixin = (superclass) => class extends superclass {
//     constructor(...args) {
//         super(...args);
//         this.maxHealth = 100;
//         this.currentHealth = this.maxHealth;
//         this.isAlive = true;
//     }
    
//     takeDamage(amount) {
//         if (!this.isAlive) return false;
        
//         this.currentHealth = Math.max(0, this.currentHealth - amount);
//         this.emit('damageTaken', amount, this.currentHealth);
//         
//         if (this.currentHealth === 0) {
//             this.die();
//         }
        
//         return true;
//     }
    
//     heal(amount) {
//         if (!this.isAlive) return false;
        
//         const oldHealth = this.currentHealth;
//         this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
//         const healed = this.currentHealth - oldHealth;
//         
//         this.emit('healed', healed, this.currentHealth);
//         return healed > 0;
//     }
    
//     die() {
//         this.isAlive = false;
//         this.emit('died');
//     }
    
//     revive(health = this.maxHealth * 0.5) {
//         if (this.isAlive) return false;
        
//         this.isAlive = true;
//         this.currentHealth = Math.min(this.maxHealth, health);
//         this.emit('revived', this.currentHealth);
//         return true;
//     }
    
//     getHealthPercentage() {
//         return (this.currentHealth / this.maxHealth) * 100;
//     }
// };

// const InventoryMixin = (superclass) => class extends superclass {
//     constructor(...args) {
//         super(...args);
//         this.inventory = [];
//         this.maxInventorySize = 20;
//     }
    
//     addItem(item) {
//         if (this.inventory.length >= this.maxInventorySize) {
//             this.emit('inventoryFull', item);
//             return false;
//         }
        
//         this.inventory.push(item);
//         this.emit('itemAdded', item);
//         return true;
//     }
    
//     removeItem(itemName) {
//         const index = this.inventory.findIndex(item => item.name === itemName);
//         if (index === -1) return null;
        
//         const item = this.inventory.splice(index, 1)[0];
//         this.emit('itemRemoved', item);
//         return item;
//     }
    
//     hasItem(itemName) {
//         return this.inventory.some(item => item.name === itemName);
//     }
    
//     getItem(itemName) {
//         return this.inventory.find(item => item.name === itemName);
//     }
    
//     getInventoryWeight() {
//         return this.inventory.reduce((total, item) => total + (item.weight || 0), 0);
//     }
    
//     getInventoryValue() {
//         return this.inventory.reduce((total, item) => total + (item.value || 0), 0);
//     }
// };

// const CombatMixin = (superclass) => class extends superclass {
//     constructor(...args) {
//         super(...args);
//         this.attack = 10;
//         this.defense = 5;
//         this.criticalChance = 0.1;
//     }
    
//     attackTarget(target) {
//         if (!this.isAlive || !target.isAlive) return false;
        
//         const damage = this.calculateDamage();
//         const isCritical = Math.random() < this.criticalChance;
//         const finalDamage = isCritical ? damage * 2 : damage;
        
//         target.takeDamage(finalDamage);
//         this.emit('attackPerformed', target, finalDamage, isCritical);
//         
//         return true;
//     }
    
//     calculateDamage() {
//         return Math.max(1, this.attack - Math.random() * 3);
//     }
    
//     defend() {
//         this.defense *= 1.5;
//         this.emit('defenseActivated', this.defense);
//     }
    
//     resetDefense() {
//         this.defense = 5;
//     }
    
//     getCombatStats() {
//         return {
//             attack: this.attack,
//             defense: this.defense,
//             criticalChance: this.criticalChance
//         };
//     }
// };

// const MovementMixin = (superclass) => class extends superclass {
//     constructor(...args) {
//         super(...args);
//         this.x = 0;
//         this.y = 0;
//         this.speed = 5;
//         this.isMoving = false;
//     }
    
//     moveTo(x, y) {
//         if (!this.isAlive) return false;
        
//         const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
//         const time = distance / this.speed;
//         
//         this.isMoving = true;
//         this.emit('movementStarted', x, y, time);
//         
//         // Имитация движения
//         setTimeout(() => {
//             this.x = x;
//             this.y = y;
//             this.isMoving = false;
//             this.emit('movementCompleted', x, y);
//         }, time * 1000);
//         
//         return true;
//     }
    
//     getPosition() {
//         return { x: this.x, y: this.y };
//     }
    
//     getDistanceTo(target) {
//         const targetPos = target.getPosition ? target.getPosition() : target;
//         return Math.sqrt((targetPos.x - this.x) ** 2 + (targetPos.y - this.y) ** 2);
//     }
    
//     canReach(target) {
//         return this.getDistanceTo(target) <= this.speed * 2;
//     }
// };

// const ExperienceMixin = (superclass) => class extends superclass {
//     constructor(...args) {
//         super(...args);
//         this.level = 1;
//         this.experience = 0;
//         this.experienceToNextLevel = 100;
//     }
    
//     gainExperience(amount) {
//         this.experience += amount;
//         this.emit('experienceGained', amount, this.experience);
//         
//         while (this.experience >= this.experienceToNextLevel) {
//             this.levelUp();
//         }
//     }
    
//     levelUp() {
//         this.experience -= this.experienceToNextLevel;
//         this.level++;
//         this.experienceToNextLevel = Math.floor(this.experienceToNextLevel * 1.5);
//         
//         // Улучшение характеристик при повышении уровня
//         this.maxHealth += 10;
//         this.currentHealth = this.maxHealth;
//         this.attack += 2;
//         this.defense += 1;
//         
//         this.emit('levelUp', this.level);
//     }
    
//     getExperienceProgress() {
//         return (this.experience / this.experienceToNextLevel) * 100;
//     }
    
//     getStats() {
//         return {
//             level: this.level,
//             experience: this.experience,
//             experienceToNextLevel: this.experienceToNextLevel,
//             progress: this.getExperienceProgress()
//         };
//     }
// };

// class Character extends ExperienceMixin(MovementMixin(CombatMixin(InventoryMixin(HealthMixin(EventEmitterMixin(Object)))))) {
//     constructor(name) {
//         super();
//         this.name = name;
//         this.setupEventListeners();
//     }
    
//     setupEventListeners() {
//         this.on('damageTaken', (damage, health) => {
//             console.log(`${this.name} получил ${damage} урона. Здоровье: ${health}`);
//         });
        
//         this.on('died', () => {
//             console.log(`${this.name} погиб!`);
//         });
        
//         this.on('levelUp', (level) => {
//             console.log(`${this.name} достиг уровня ${level}!`);
//         });
        
//         this.on('attackPerformed', (target, damage, isCritical) => {
//             const criticalText = isCritical ? ' (КРИТ!)' : '';
//             console.log(`${this.name} атакует ${target.name} и наносит ${damage} урона${criticalText}`);
//         });
        
//         this.on('itemAdded', (item) => {
//             console.log(`${this.name} получил предмет: ${item.name}`);
//         });
        
//         this.on('movementCompleted', (x, y) => {
//             console.log(`${this.name} переместился в позицию (${x}, ${y})`);
//         });
//     }
    
//     getInfo() {
//         return {
//             name: this.name,
//             health: `${this.currentHealth}/${this.maxHealth} (${this.getHealthPercentage().toFixed(1)}%)`,
//             position: this.getPosition(),
//             level: this.level,
//             inventory: this.inventory.length,
//             isAlive: this.isAlive
//         };
//     }
    
//     rest() {
//         if (this.heal(this.maxHealth * 0.3)) {
//             console.log(`${this.name} отдохнул и восстановил здоровье`);
//         }
//     }
    
//     loot(target) {
//         if (target.inventory && target.inventory.length > 0) {
//             const item = target.inventory[0];
//             if (this.addItem(item)) {
//                 target.removeItem(item.name);
//                 console.log(`${this.name} забрал ${item.name} у ${target.name}`);
//             }
//         }
//     }
// }

// // Демонстрация работы
// const hero = new Character('Герой');
// const enemy = new Character('Гоблин');

// // Добавляем предметы
// hero.addItem({ name: 'Меч', weight: 5, value: 100 });
// hero.addItem({ name: 'Зелье здоровья', weight: 1, value: 50 });

// // Бой
// hero.attackTarget(enemy);
// enemy.attackTarget(hero);

// // Движение
// hero.moveTo(10, 10);

// // Получение опыта
// hero.gainExperience(150);

// // Отдых
// hero.rest();

// console.log(hero.getInfo());
// console.log(enemy.getInfo()); 