let model = {
    hair: 'black',
    clothes: {
        shirt: {
            color: 'white',
            size: 'M'
        },
    }
}
let model2 = {
    hair: 'black',
    clothes: {
        shirt: {
            color: 'white',
            size: 'M'
        },
    }
}
let model3 = {
    hair: 'black',
    clothes: {
        shirt: {
            color: 'white',
            size: 'M'
        },
    }
}

let collection = new WeakMap()

collection.set(model, 'Есть в наличии модель')
collection.set(model2, 'Есть в наличии модель2')
collection.set(model3, 'Есть в наличии модель3')

console.log(collection)
console.log(collection.get(model))
console.log(collection.get(model2))
console.log(collection.get(model3))
console.log(collection.has(model3))
console.log(collection.size)
console.log(collection.delete(model3))
console.log(collection.get(model3))
console.log(collection.has(model3))

let collectionCopy1 = collection
let collectionCopy2 = {...collection}
let collectionCopy3 = JSON.parse(JSON.stringify(collection))
let collectionCopy4 = function () { 
    try {
        return structuredClone(collection) 
    } catch (error) {
        return 'ошибка'
    }
}

let obj = {name: 'sergey'}
collection.set(obj, 'объект Сергей')

console.log('Исходник',collection.get(obj))
console.log('Копирование 1 - ссылка: ', collectionCopy1.get(obj))
console.log('Копирование 2 - спред оператор: ', collectionCopy2, ' - объект не скопирован, {}')
console.log('Копирование 3 - JSON.parse(JSON.stringify()): ', collectionCopy3, ' - объект не скопирован, {}')
console.log('Копирование 4 - structuredClone(): ', collectionCopy4(), 'ошибка')