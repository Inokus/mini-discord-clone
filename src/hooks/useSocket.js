import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'

const useSocket = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [session, setSession] = useState(null)
  const [messages, setMessages] = useState({})
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const channels = Object.keys(messages)

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true)
    }

    const handleDisconnect = () => {
      setIsConnected(false)
      setSession(null)
      setMessages({})
      setSelectedChannel(null)
      setUsers([])
    }

    const handleSession = session => {
      localStorage.setItem('sessionId', session.sessionId)
      setSession(session)
      setIsLoading(false)
    }

    const handleChannels = channels => {
      if (channels.length > 0) {
        setSelectedChannel(channels[0].name)
      }

      const channelMessages = channels.reduce((acc, channel) => {
        acc[channel.name] = channel.messages
        return acc
      }, {})

      setMessages(channelMessages)
    }

    const handleUsers = users => {
      setUsers(users)
    }

    const handleUserJoin = user => {
      setUsers(prevUsers => [...prevUsers, { ...user, connected: true }])
    }

    const handleUserLeave = user => {
      setUsers(prevUsers => prevUsers.filter(prevUser => prevUser.userId !== user.userId))
    }

    const handleUserReconnect = user => {
      setUsers(prevUsers =>
        prevUsers.map(prevUser =>
          prevUser.userId === user.userId ? { ...prevUser, connected: true } : prevUser,
        ),
      )
    }

    const handleUserDisconnect = user => {
      setUsers(prevUsers =>
        prevUsers.map(prevUser =>
          prevUser.userId === user.userId ? { ...prevUser, connected: false } : prevUser,
        ),
      )
    }

    const handleMessage = (channel, message) => {
      setMessages(prevMessages => {
        const updatedMessages = { ...prevMessages }
        updatedMessages[channel] = [...updatedMessages[channel], message]
        return updatedMessages
      })
    }

    const handleError = error => {
      if (error.data && error.data.reason) {
        if (error.data.reason === 'USERNAME_TAKEN') {
          setError('This username is already taken, please choose another one')
        } else if (error.data.reason === 'INVALID_CREDENTIALS') {
          localStorage.removeItem('sessionId')
        }
        setIsLoading(false)
      }
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('session', handleSession)
    socket.on('channels', handleChannels)
    socket.on('users', handleUsers)
    socket.on('user:join', handleUserJoin)
    socket.on('user:leave', handleUserLeave)
    socket.on('user:reconnect', handleUserReconnect)
    socket.on('user:disconnect', handleUserDisconnect)
    socket.on('message:channel', handleMessage)
    socket.on('connect_error', handleError)

    // Handle login with sessionId if available
    const sessionId = localStorage.getItem('sessionId')
    if (sessionId) {
      socket.auth = { sessionId }
      socket.connect()
    } else {
      setIsLoading(false)
    }

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('session', handleSession)
      socket.off('channels', handleChannels)
      socket.off('users', handleUsers)
      socket.off('user:join', handleUserJoin)
      socket.off('user:leave', handleUserLeave)
      socket.off('user:reconnect', handleUserReconnect)
      socket.off('user:disconnect', handleUserDisconnect)
      socket.off('message:channel', handleMessage)
    }
  }, [])

  return {
    isLoading,
    isConnected,
    session,
    messages,
    channels,
    selectedChannel,
    users,
    error,
    setSelectedChannel,
    setIsConnected,
    setSession,
    setMessages,
    setUsers,
    setError,
  }
}

export default useSocket
