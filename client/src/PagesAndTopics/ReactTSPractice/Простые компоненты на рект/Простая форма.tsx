import React, { useCallback, useState } from 'react'

export const SimpleForm = React.memo(() => {
    const [inputName, setInputName] = useState('')
    const [inputAge, setInputAge] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPhone, setInputPhone] = useState('')

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Данные формы:', {
            name: inputName,
            age: inputAge,
            email: inputEmail,
            phone: inputPhone
        })
    }, [inputName, inputAge, inputEmail, inputPhone])

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder='Введите имя'
                value={inputName}
                type='text'
                onChange={e => setInputName(e.target.value)}
            />
            <input
                placeholder='Введите возраст'
                value={inputAge}
                type='number'
                onChange={e => setInputAge(e.target.value)}
            />
            <input
                placeholder='Введите email'
                value={inputEmail}
                type='email'
                onChange={e => setInputEmail(e.target.value)}
            />
            <input
                placeholder='Введите телефон'
                value={inputPhone}
                type='tel'
                onChange={e => setInputPhone(e.target.value)}
            />
            <button type="submit">Отправить</button>
        </form>
    )
})