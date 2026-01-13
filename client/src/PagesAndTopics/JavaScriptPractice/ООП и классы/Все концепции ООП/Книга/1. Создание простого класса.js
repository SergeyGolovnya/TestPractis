class Car {
    constructor (model,color, engine) {
        this.model = model;
        this.color = color;
        this.engine = engine || '1';
    }
    workEngine = false;

    getInfo() {
        return `Модель: ${this.model}, Цвет: ${this.color}, Количество цилиндров: ${this.engine}`;
    }
    startEngine() {
        this.workEngine = true;
        console.log(this.model + ' Двигатель запущен');
    }
    stopEngine() {
        if(!this.workEngine) {
            console.log(this.model + ' Двигатель не запущен');
        } else {
            this.workEngine = false;
            console.log(this.model + ' Двигатель остановлен');
        }
    }
}

const car1 = new Car('Toyota', 'Red', 4);
const car2 = new Car('Ford', 'Blue', 6);

console.log(car1.getInfo());
console.log(car2.getInfo());
car1.startEngine();
car1.stopEngine();
car2.stopEngine();

class Bus extends Car {
    constructor(model, color, engine, seats) {
        super(model, color, engine);
        this.seats = seats;
    }
}

const bus1 = new Bus('Bus', 'Red', 4, 30);
console.log(bus1.getInfo());
bus1.startEngine();
bus1.stopEngine();

class Truck extends Car {
    constructor(model, color, engine, cargo) {
        super(model, color, engine);
        this.cargo = cargo;
    }
    getInfo() {
        return `${super.getInfo()}, Грузоподъемность: ${this.cargo} кг`; // Объеденилось с родительским методом getInfo
    }
}

const truck1 = new Truck('Truck', 'Red', 4, 1000);
console.log(truck1.getInfo()); // Объеденилось с родительским методом getInfo
truck1.startEngine();
truck1.stopEngine();

class Motorcycle extends Car {
    constructor(model, color, engine, engineSize) {
        super(model, color, engine);
        this.engineSize = engineSize;
    }
    startEngine() {
        console.log(this.model + ' Двигатель запущен');
    }
}

const motorcycle1 = new Motorcycle('Motorcycle', 'Red', 1, 100);
console.log(motorcycle1.getInfo());
motorcycle1.startEngine();
motorcycle1.stopEngine();