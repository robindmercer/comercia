import { React, useState } from 'react'
import style from './landing.module.css'


// Landing Page
function LandingPage() {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [input, setInput] = useState({
    usr: '',
    password: '',
  })

  
  function handleSubmit(e) {
    e.preventDefault()
    localStorage.setItem('usuario', input.usr)
    localStorage.setItem('pass', input.password) 
     window.location.href = '/layout';
  }

  
  // Handle Inputs
  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      }),
    )
  }
  
  // Handle Focus
  function onFocus(ev) {
    setTouched({
      ...touched,
      [ev.target.name]: true,
    })
  }
  

  function validateForm(input) {
    let errors = {}
    errors.ok = 'OK'
    if (!input.usr || input.usr === '') {
      errors.usr = 'Debe ingresar un Usuario'
      errors.ok = 'NO'
    } else {
      errors.title = ''
    }
    if (!input.password || input.password === '') {
      errors.password = 'Debe ingresar su Clave'
      errors.ok = 'NO'
    } else {
      errors.password = ''
    }

    return errors
  }


  return (
    <>
      <div className={style.landing}>
        <div className={style.msgContainer}>
          <form onSubmit={handleSubmit} className={style.formDetail}>
            <p className={style.title}>&nbsp;</p>
            <div className={style.usuario}>
              <input type="text"
                className={style.usr}
                id="usr"
                name="usr"
                onBlur={onFocus}
                value={input.usr}
                onChange={handleInput}
                placeholder="Ingrese su usuario"></input>
              {errors.usr && touched.usr && (
                <p className={style.error}>{errors.usr}</p>
              )}
            </div>
            <div className={style.usuario}>
              <input type="password"
                className={style.usr}
                id="password"
                name="password"
                onBlur={onFocus}
                value={input.password}
                onChange={handleInput}
                placeholder="Ingrese su clave"></input>
              {errors.password && touched.password && (
                <p className={style.error}>{errors.password}</p>
              )}
            </div>
            <button className={style.button} type="submit" name="grabar">
              Enter
            </button>
          </form>

        </div>
      </div>
    </>
  )
}
export default LandingPage
