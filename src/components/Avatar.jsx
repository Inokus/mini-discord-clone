import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

function Avatar({ color, className }) {
  return (
    <div
      className={classNames('w-10 h-10 rounded-full flex justify-center items-center', className)}
      style={{ backgroundColor: color }}
    >
      <FontAwesomeIcon icon={faDiscord} className="h-3/5 text-white" />
    </div>
  )
}

export default Avatar
