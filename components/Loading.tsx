import classNames from "classnames"

interface ILoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Loading({ color = "kwil", ...props }: ILoadingProps) {
  return (
    <div {...props} data-testid="loading-icon">
      <svg
        className={classNames("h-4 w-4 animate-spin", {
          "text-kwil": color === "kwil",
          "text-white": color === "white",
        })}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}
