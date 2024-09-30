import { useState } from 'react'

function MessageInput({ selectedChannel, onSendMessage }) {
  const [message, setMessage] = useState('')

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      const trimmedMessage = message.trim()
      if (trimmedMessage) {
        e.preventDefault()
        onSendMessage(trimmedMessage)
        setMessage('')
      }
    }
  }
  return (
    <input
      name="message"
      className="p-3 mx-4 my-6 rounded-lg bg-background-200 placeholder-text-500"
      autoComplete="off"
      placeholder={`Message #${selectedChannel}`}
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default MessageInput
