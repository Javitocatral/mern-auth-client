import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { Navigate } from 'react-router-dom'

function Private(props) {
  const { isLoggeIn } = useContext(AuthContext)
  if (isLoggeIn) {
    return props.children
  } else {
    return <Navigate to={'/login'} />
  }
}

export default Private
