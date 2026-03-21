export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-200 bg-transparent" : "bg-yellow-400"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-gray-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-200"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }