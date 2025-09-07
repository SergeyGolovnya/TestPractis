// this в стрелочных использую внешнее лексическое окружение

// Простой способ задать this
const obj = {
    a: 'Текст',
    fun: function () {console.log(this.a)}
}
obj.fun()

// стрелочная функция

function funOutSide () {
    let a = 'Текст funOutSide';
    const obj = {
        a: 'Текст obj'
    }

    return function () {
        console.log(a);
        return () => console.log(this.a)
    }
}

const dd = funOutSide()
dd() // 'Текст funOutSide'
