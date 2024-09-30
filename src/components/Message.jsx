import classNames from 'classnames'
import { formatDate, formatDateToTime } from '@/utils/formatDate'

function Message({ message, isSameUser, isActiveUser }) {
  return (
    <div className="flex-1">
      {isSameUser ? (
        <div className="relative group">
          <span className="text-xs text-text-400 absolute top-1/2 left-[-4rem] transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-200">
            {formatDateToTime(message.date)}
          </span>
          <div className="text-text-300">{message.message}</div>
        </div>
      ) : (
        <div>
          <span
            className={classNames('mr-2 font-semibold text-text-200', {
              'opacity-50': !isActiveUser,
            })}
          >
            {message.username}
          </span>
          <span className="text-xs text-text-400">{formatDate(message.date)}</span>
          <div className="text-text-300">{message.message}</div>
        </div>
      )}
    </div>
  )
}

export default Message
