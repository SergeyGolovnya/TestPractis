const obj = {
    name: 'Сергей',
    education: {
        curses: ['Програмирование', 'Маркетинг'],
        institute: 'Иркутский институт'
    },
    _password: null,

    get password () {
        return this._password
    },

    set password (val) {
        this._password = `***${val}***`
    }
}

console.log(`Первый вызов: ${obj.password}`)
obj.password = '1122'
console.log(`Второй вызов: ${obj.password}`)

