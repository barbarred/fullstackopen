import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

const LoginForm = ({ setError, setToken, show, LOGIN, setPage, setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN,{
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('phonenumbers-user-token', token)
      const user = result.data.login.user
      setUser(user)
      localStorage.setItem('loggedUser', JSON.stringify(user))
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }
  if (!show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm