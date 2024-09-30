import { useMemo } from 'react'
import Avatar from './Avatar'

function UserList({ users }) {
  const { onlineUsers, offlineUsers } = useMemo(() => {
    const sortedUsers = [...users].sort((a, b) => a.username.localeCompare(b.username))

    const onlineUsers = sortedUsers.filter(user => user.connected)
    const offlineUsers = sortedUsers.filter(user => !user.connected)

    return { onlineUsers, offlineUsers }
  }, [users])

  return (
    <div className="flex-1 overflow-auto px-2 pt-2 space-y-4">
      <div className="text-text-400">
        <h3 className="text-xs font-bold">ONLINE — {onlineUsers.length}</h3>
        {onlineUsers.length > 0 && (
          <ul className="space-y-3 mt-3">
            {onlineUsers.map(user => (
              <li key={user.userId} className="flex items-center space-x-2">
                <div className="relative">
                  <Avatar color={user.avatarColor} className={'w-8 h-8'} />
                  <div className="w-2.5 h-2.5 absolute right-0 bottom-0 bg-presence-online rounded-full outline outline-background-500" />
                </div>
                <span className="flex-1 overflow-hidden text-nowrap text-ellipsis">
                  {user.username}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-text-400">
        <h3 className="text-xs font-bold text-text-400">OFFLINE — {offlineUsers.length}</h3>
        {offlineUsers.length > 0 && (
          <ul className="space-y-3 mt-3">
            {offlineUsers.map(user => (
              <li key={user.userId} className="flex items-center space-x-2 opacity-50">
                <Avatar color={user.avatarColor} className={'w-8 h-8'} />
                <span className="flex-1 overflow-hidden text-nowrap text-ellipsis">
                  {user.username}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserList
