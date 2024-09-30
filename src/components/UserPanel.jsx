import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Avatar from './Avatar'
import Button from './Button'

function UserPanel({ session, onLeave }) {
  const handleClick = e => {
    e.preventDefault()
    onLeave()
  }

  return (
    <div className="h-[52px] p-2 flex justify-between items-center bg-background-700">
      <div className="flex gap-2">
        <div className="relative">
          <Avatar color={session.avatarColor} className={'w-8 h-8'} />
          <div className="w-2.5 h-2.5 absolute right-0 bottom-0 bg-presence-online rounded-full outline outline-background-700" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm text-text-200">{session.username}</span>
          <span className="text-xs text-text-400">{session.connected ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      <div className="text-text-300">
        <Button
          className={
            'px-[8px] flex items-center hover:bg-background-300 hover:text-action-danger active:text-action-danger-active'
          }
          aria-label="Leave server"
          title="Leave server"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-5" />
        </Button>
      </div>
    </div>
  )
}

export default UserPanel
