import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com';

let df2 = 1+4
// 1. Базовый пример с одним запросом (исправленный)
const getUser = async () => {
    try {
        const response = await axios.get(`${baseUrl}/users/1`)
        const user = response.data.name
        return user
    } catch (error) {
        return console.log('Ошибка получения User', error)
    }
}

// Получит только промис
const myGuest = getUser().then(result => {
    return result
}).catch(error => {
    console.error('Ошибка:', error)
})

// Получит результат промиса
let myGuest2 = getUser().then(result => {
        myGuest2 = result;
        return myGuest2
}).catch(error => {
    console.error('Ошибка:', error)
})

const myGuest3 = await getUser()

console.log('myGuest1: ', myGuest) // показывает проис вместо результата
console.log('myGuest2: ', myGuest2) //Работает
console.log('myGuest3: ', myGuest3) //Работает
console.log(df2)
console.log(df2)