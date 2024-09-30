import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import Avatar from './Avatar'
import Message from './Message'

function MessageList({ messages, selectedChannel, users }) {
  const messagesContainerRef = useRef(null)

  let lastUserId = null

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, selectedChannel])

  return (
    <div className="flex-1 overflow-auto" ref={messagesContainerRef}>
      {messages.length > 0 && (
        <div>
          {messages.map(message => {
            const isSameUser = lastUserId === message.userId
            if (!isSameUser) {
              lastUserId = message.userId
            }
            const isActiveUser = users.some(user => user.userId === message.userId)
            return (
              <div
                key={message.id}
                className={classNames(
                  'flex items-center pb-0.5 pr-12 pl-[72px] relative hover:bg-background-600',
                  {
                    'pt-2': !isSameUser,
                  },
                )}
              >
                {!isSameUser && (
                  <div className="absolute left-4">
                    <Avatar
                      color={message.avatarColor}
                      className={isActiveUser ? '' : 'opacity-50'}
                    />
                  </div>
                )}
                <Message message={message} isSameUser={isSameUser} isActiveUser={isActiveUser} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MessageList
