const user = {
    name: 'Sergey',
    age: 12
}

console.log('1 call user: ',user)

const user2 = user

console.log('1 call user2: ',user2)

user2.name = 'Victor'

console.log('2 call user (изменился): ',user) // { name: 'Victor', age: 12 } меняли user2 а переопределился user
console.log('2 call user2 (изменил исходник): ',user2) // { name: 'Victor', age: 12 }

// Что бы не было переопределения нужно исопльзовать копирование

// Спред ... - поверхностная (не копирует вложенные)
const user3 = {...user} // только 1-й слой
user3.name = 'Anatoliy'
console.log('1 call user3 (не повлиял на исходник):', user3)
console.log('3 call user (исходник не изменен):',user)

// Object.assign - поверхностная (не копирует вложенные)
const user4 = Object.assign({}, user)
user4.name = 'Svetlana'
console.log('1 call user4 (не повлиял на исходник):', user4)
console.log('4 call user (исходник не изменен):',user)


// Не работает с вложенность

const model = {
    hair: 'black',
    clothes: {
        shirt: {
            color: 'white',
            size: 'M'
        },
    }
}

console.log('1 call / color = white', model)

const model2 = {...model}
const model3 = Object.assign({}, model)

model2.clothes.shirt.color = 'нет цвета'
console.log('2 call / model2 - мутировал model color = нет цвета', model)
model3.clothes.shirt.color = 'цвет настроения синий'
console.log('3 call / model3 - мутировал model color = цвет настроения синий', model)
