import { useState } from 'react'
import { StyleContainer } from '../styles/styles'

export const  EmailForm = () => {
  const [mail, setMail] = useState('')
  const [error, setError] = useState('')
  const [submittedMail, setSubmittedMail] = useState('')

  const handleSaveEmailForm = (e) => {
    e.preventDefault();
    if(!mail.includes('@')) {
      setError('Email должен содержать символ @')
      return
    }
    setError('')
    setSubmittedMail(mail)
    setMail('')
  }

  return (
    <StyleContainer>
      <form
      onSubmit={handleSaveEmailForm}
      >
        <input
          placeholder='Введите почту'
          value={mail}
          onChange={(e)=> setMail(e.target.value) }
        />
        <button
        type='submit'
        >Отправить почту</button>
      </form>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {submittedMail && <div>
        Зарегистрированная почта: {submittedMail}
      </div>}
    </StyleContainer>
  )
}
