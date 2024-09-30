import Button from './Button'
import classNames from 'classnames'

function ChannelList({ channels, selectedChannel, onSelect }) {
  return (
    <nav className="flex-1 px-2 pt-2 overflow-auto">
      {channels.length > 0 && (
        <ul className="space-y-0.5 font-semibold">
          {channels.map(channel => (
            <li key={channel} className="h-[34px]">
              <Button
                type="button"
                className={classNames('h-full w-full py-0 text-base text-left text-nowrap', {
                  'bg-background-100 text-text-100': selectedChannel === channel,
                  'text-text-400 hover:bg-background-300 hover:text-text-300':
                    selectedChannel !== channel,
                })}
                aria-pressed={selectedChannel === channel}
                onClick={() => onSelect(channel)}
              >
                # {channel}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default ChannelList
