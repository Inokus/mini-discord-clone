import classNames from 'classnames'

function Button({ children, className, ...props }) {
  return (
    <button
      className={classNames(
        'px-4 py-2 rounded text-sm transition duration-200',
        {
          'opacity-50 cursor-not-allowed': props.disabled,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
