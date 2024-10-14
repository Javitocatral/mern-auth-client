import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

function AuthWrapper(props) {
  const [isLoggeIn, setIsLoggeIn] = useState(false)
  const [loggeUserId, setloggeUserId] = useState(null)
  const [isValidatingToken, setIsValidaingToken] = useState(true)
  useEffect(() => {
    authenticateUser()
  }, [])

  const authenticateUser = async () => {
    try {
      const authToken = localStorage.getItem('authToken')
      const response = await axios.get(
        'http://localhost:5005/api/auth/verify',
        {
          headers: { authorization: `Bearer ${authToken}` },
        }
      )
      console.log(response)
      setIsLoggeIn(true)
      setloggeUserId(response.data._id)
      setIsValidaingToken(false)
    } catch (error) {
      setIsValidaingToken(true)

      console.log(error)
      setIsLoggeIn(false)
      setloggeUserId(null)
    }
  }
  const passedContext = {
    isLoggeIn,
    loggeUserId,
    authenticateUser,
  }
  if (isValidatingToken) {
    return <h3>...Validando Usuario</h3>
  }
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthWrapper }
