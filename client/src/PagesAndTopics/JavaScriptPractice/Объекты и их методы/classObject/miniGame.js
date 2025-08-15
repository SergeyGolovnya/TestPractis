// Основной класс персонажа
class PersonGame {
    constructor(hand, body, leg, health = 100) {
      this.head = 'голова';
      this.hand = hand || 'рука';
      this.body = body || 'тело';
      this.leg = leg || 'нога';
      this.health = health; // Добавляем здоровье
    }
  
    // Метод: поднимает руку
    handUp() {
      return `${this.name || 'Перо'} поднял ${this.hand} вверх и посмеялся через ${this.head}`;
    }
  
    // Метод: показывает тело
    showBody() {
      return `${this.name || 'Персонаж'} демонстрирует ${this.body}`;
    }
  
    // Метод: делает кувырок
    doFlip() {
      return `${this.name || 'Персонаж'} делает кувырок, используя ${this.hand} и ${this.leg}`;
    }
  
    // Метод: атака
    attack(target) {
      const damage = Math.floor(Math.random() * 20) + 10; // Урон от 10 до 30
      target.health -= damage;
      return `${this.name} атакует ${target.name}, нанося ${damage} урона! ${target.name} имеет ${target.health} HP.`;
    }
  }
  
  // Уровень 1: Мутация
  class Mutation extends PersonGame {
    constructor(name, hand, body, leg, mutationType, health = 120) {
      super(hand, body, leg, health);
      this.name = name;
      this.head = 'мутировавшая голова';
      this.mutationType = mutationType; // Тип мутации (например, "огонь", "яд")
    }
  
    // Переопределённый метод
    handUp() {
      return `${this.name} поднимает ${this.hand} с эффектом ${this.mutationType}!`;
    }
  
    // Новый метод: мутационная атака
    mutationAttack(target) {
      const damage = Math.floor(Math.random() * 30) + 15; // Урон от 15 до 45
      target.health -= damage;
      return `${this.name} использует ${this.mutationType}-атаку на ${target.name}, нанося ${damage} урона! ${target.name} имеет ${target.health} HP.`;
    }
  }
  
  // Уровень 2: Воин
  class Warrior extends Mutation {
    constructor(name, hand, body, leg, mutationType, weapon, health = 150) {
      super(name, hand, body, leg, mutationType, health);
      this.weapon = weapon;
    }
  
    // Переопределённый метод
    showBody() {
      return `${this.name} гордо демонстрирует ${this.body}, держа ${this.weapon}`;
    }
  
    // Новый метод: атака оружием
    weaponAttack(target) {
      const damage = Math.floor(Math.random() * 40) + 20; // Урон от 20 до 60
      target.health -= damage;
      return `${this.name} бьёт ${target.name} с помощью ${this.weapon}, нанося ${damage} урона! ${target.name} имеет ${target.health} HP.`;
    }
  }
  
  // Уровень 3: Командир
  class Commander extends Warrior {
    constructor(name, hand, body, leg, mutationType, weapon, leadership, health = 180) {
      super(name, hand, body, leg, mutationType, weapon, health);
      this.leadership = leadership; // Уровень лидерства
    }
  
    // Переопределённый метод
    doFlip() {
      return `${this.name} делает эпичный кувырок с ${this.hand} и ${this.leg}, вдохновляя команду своим ${this.leadership}!`;
    }
  
    // Новый метод: командный бафф
    inspireTeam() {
      return `${this.name} использует ${this.leadership}, повышая боевой дух команды!`;
    }
  }
  
  // Уровень 4: Легенда
  class Legend extends Commander {
    constructor(name, hand, body, leg, mutationType, weapon, leadership, legendPower, health = 220) {
      super(name, hand, body, leg, mutationType, weapon, leadership, health);
      this.legendPower = legendPower; // Уникальная способность
    }
  
    // Переопределённый метод
    handUp() {
      return `${this.name} поднимает ${this.hand}, активируя ${this.legendPower}!`;
    }
  
    // Новый метод: легендарная способность
    useLegendPower(target) {
      const damage = Math.floor(Math.random() * 60) + 30; // Урон от 30 до 90
      target.health -= damage;
      return `${this.name} использует ${this.legendPower} против ${target.name}, нанося ${damage} урона! ${target.name} имеет ${target.health} HP.`;
    }
  }
  
  // Создаём персонажей
  const goblin = new Mutation('Гоблин', 'крюк', 'мощное тело', 'ноги-ножи', 'яд', 120);
  const paladin = new Warrior('Паладин', 'кулак', 'хлипкое тело', 'супер ноги', 'свет', 'меч света', 150);
  const commander = new Commander('Командир', 'железная рука', 'бронированное тело', 'механические ноги', 'огонь', 'огненный топор', 'харизма', 180);
  const legend = new Legend('Легенда', 'мифическая рука', 'титановое тело', 'крылатые ноги', 'молния', 'громовой молот', 'эпическое лидерство', 'громовой удар', 220);
  
  // Тестируем методы
  console.log(goblin.showBody()); // Гоблин демонстрирует мощное тело
  console.log(goblin.handUp()); // Гоблин поднимает крюк с эффектом яд!
  console.log(paladin.doFlip()); // Паладин делает кувырок, используя кулак и супер ноги
  console.log(commander.inspireTeam()); // Командир использует харизма, повышая боевой дух команды!
  console.log(legend.useLegendPower(goblin)); // Легенда использует громовой удар против Гоблин, нанося 45 урона! Гоблин имеет 75 HP.
  
  // Мини-игра: Бой между персонажами
  function battle(attacker, defender) {
    console.log(`\n--- Бой: ${attacker.name} против ${defender.name} ---`);
    while (attacker.health > 0 && defender.health > 0) {
      // Атакующий использует случайный метод атаки
      const attacks = [
        () => attacker.attack(defender),
        () => attacker.mutationAttack?.(defender),
        () => attacker.weaponAttack?.(defender),
        () => attacker.useLegendPower?.(defender)
      ].filter(fn => fn); // Фильтруем доступные атаки
      const randomAttack = attacks[Math.floor(Math.random() * attacks.length)];
      console.log(randomAttack());
  
      // Проверяем, жив ли защитник
      if (defender.health <= 0) {
        console.log(`${defender.name} повержен!`);
        break;
      }
  
      // Защитник контратакует
      const defenderAttacks = [
        () => defender.attack(attacker),
        () => defender.mutationAttack?.(attacker),
        () => defender.weaponAttack?.(attacker),
        () => defender.useLegendPower?.(attacker)
      ].filter(fn => fn);
      const randomDefenderAttack = defenderAttacks[Math.floor(Math.random() * defenderAttacks.length)];
      console.log(randomDefenderAttack());
  
      // Проверяем, жив ли атакующий
      if (attacker.health <= 0) {
        console.log(`${attacker.name} повержен!`);
        break;
      }
    }
  }
  
  // Запускаем бой
  battle(legend, goblin);
  battle(paladin, commander);