import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'

function Login() {
  const navigate = useNavigate()
  const { authenticateUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userCredential = {
        email,
        password,
      }
      const response = await axios.post(
        'http://localhost:5005/api/auth/login',
        userCredential
      )

      console.log(response)
      localStorage.setItem('authToken', response.data.authToken)

      await authenticateUser()

      navigate('/private-page-example')
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        //pagian generica de error
      }
    }

    // ... contactar al backend para validar credenciales de usuario aqui
  }

  return (
    <div>
      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>
        {errorMessage && <h5 style={{ color: 'red' }}>{errorMessage}</h5>}
      </form>
    </div>
  )
}

export default Login
