
const MenuCloseIcon = (props) => {
    return (
        <div>
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <g clipPath="url(#clip0_1086_7177)">
              <path
                d="M18 6L6 18"
                stroke="#0E73F6"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#0E73F6"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1086_7177">
                <rect width={24} height={20} fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      );
}

export default MenuCloseIcon