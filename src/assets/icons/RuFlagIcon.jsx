
export const RuFlagIcon = (props) => {
  return (
    <div>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_103_9950)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H24V24H0V0Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8H24V24H0V8Z"
            fill="#0039A6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 16H24V24H0V16Z"
            fill="#D52B1E"
          />
        </g>
        <defs>
          <clipPath id="clip0_103_9950">
            <rect width={24} height={24} rx={12} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default RuFlagIcon;
