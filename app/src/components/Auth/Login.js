import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/reducer/authSlice'
import { loginUser } from '../../misc/services'

import './Login.css'

const Login = () => {
  // no props
  // state
  const [error, setError] = useState(null)
  // no store
  // no param
  // local variables
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const _handleSubmit = (event) => {
    // pour éviter le rechargement de la page après cette fonction
    event.preventDefault()
    loginUser(emailInput.current.value, passwordInput.current.value)
      .then(response => {
        if (response.status === 'ok') {
          dispatch(login({ accessToken: response.accessToken, refreshToken: response.refreshToken, userId: response.userId }))
          setError(null)
          emailInput.current.value = ''
          passwordInput.current.value = ''
          navigate('/')
        } else {
          setError({ message: response.status })
        }
      })
      .catch(error => setError({ message: error }))
  }

  const _displayError = () => {
    emailInput.current.value = ''
    passwordInput.current.value = ''
    return (
            <div>
                <p className="message">{error.message}</p>
            </div>
    )
  }

  return (
        <div className="connect-user">
            <h1>BOILERPLATE API-FLASK-REACT</h1>
            <h2>Se connecter</h2>
            <form onSubmit={_handleSubmit}>
                <div className='user-mail'>
                    <input id="usermail" name="usermail" type="text" placeholder="Mail" ref={emailInput}/>
                </div>
                <div className='user-password'>
                    <input id="userpassword" name="userpassword" type="password" placeholder="Mot de passe" ref={passwordInput}/>
                </div>
                <div className='controls'>
                    <input type="submit" value="Se connecter" />
                </div>
            </form>
            {error && _displayError()}
        </div>
  )
}

export default Login
