import { useCallback } from 'react'
import useSocket from '@/hooks/useSocket'
import { socket } from '@/libs/socket'
import classNames from 'classnames'
import LoginForm from '@/components/LoginForm'
import ChannelList from '@/components/ChannelList'
import UserList from '@/components/UserList'
import MessageList from '@/components/MessageList'
import MessageInput from '@/components/MessageInput'
import UserPanel from '@/components/UserPanel'

function App() {
  const {
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
  } = useSocket()

  const handleLogin = useCallback(username => {
    if (username) {
      socket.auth = { username }
      socket.connect()
    }
  }, [])

  const handleLeave = useCallback(() => {
    localStorage.removeItem('sessionId')
    socket.emit('user:leave')
    setIsConnected(false)
    setSession(null)
    setMessages({})
    setSelectedChannel(null)
    setUsers([])
  }, [setIsConnected, setSession, setMessages, setSelectedChannel, setUsers])

  const handleChannelSelect = useCallback(
    channel => {
      if (channel !== selectedChannel) {
        setSelectedChannel(channel)
      }
    },
    [selectedChannel, setSelectedChannel],
  )

  const handleSendMessage = useCallback(
    message => {
      if (selectedChannel) {
        socket.emit('message:channel:send', selectedChannel, message)
      }
    },
    [selectedChannel],
  )

  return (
    !isLoading && (
      <div
        className={classNames('w-full h-full flex', {
          'justify-center items-center': !isConnected,
        })}
      >
        {isConnected && session ? (
          <>
            <aside className="w-60 h-full flex flex-col bg-background-500">
              <ChannelList
                channels={channels}
                selectedChannel={selectedChannel}
                onSelect={handleChannelSelect}
              />
              <UserPanel session={session} onLeave={handleLeave}></UserPanel>
            </aside>
            <main className="flex-1 flex flex-col overflow-auto">
              <MessageList
                messages={messages[selectedChannel] || []}
                selectedChannel={selectedChannel}
                users={users}
              ></MessageList>
              <MessageInput
                selectedChannel={selectedChannel}
                onSendMessage={handleSendMessage}
              ></MessageInput>
            </main>
            <aside className="w-60 h-full flex flex-col bg-background-500">
              <UserList users={users} />
            </aside>
          </>
        ) : (
          <LoginForm onSubmit={handleLogin} error={error} setError={setError} />
        )}
      </div>
    )
  )
}

export default App
