import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

function LoginForm({ onSubmit, error, setError }) {
  const [username, setUsername] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const trimmedUsername = username.trim()

    if (trimmedUsername.length < 2) {
      setLocalError('Username must be at least 2 characters long')
      return
    } else if (trimmedUsername.length > 16) {
      setLocalError('Username cannot be longer than 16 characters')
      return
    } else if (!/^[a-zA-Z0-9]+$/.test(trimmedUsername)) {
      setLocalError('Username can only contain letters and numbers')
      return
    }

    setError('')
    setLocalError('')

    onSubmit(trimmedUsername)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[380px] h-14 mb-6 mx-2 rounded-full bg-background-800  flex justify-center text-center relative"
    >
      <input
        type="text"
        name="username"
        value={username}
        className="ml-8 px-2 bg-inherit flex-1 placeholder-text-500"
        autoComplete="off"
        aria-label="Username"
        placeholder="Enter a Username"
        onChange={e => {
          setUsername(e.target.value)
        }}
      ></input>
      <Button className="w-14 m-2 rounded-full bg-action-primary hover:bg-action-primary-hover active:bg-action-primary-active">
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
      {(localError || error) && (
        <span className="absolute top-[100%] translate-y-4 text-action-danger">
          {localError || error}
        </span>
      )}
    </form>
  )
}

export default LoginForm
