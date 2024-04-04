export const LeftArrowIcon = (props) => {
  return (
    <div>
      <svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="currentColor"
        {...props}
      >
        <rect width={32} height={32} rx={16} fill="#D1D1D1" fillOpacity="0.5" />
        <path
          d="M23 16H9M9 16L16 23M9 16L16 9"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default LeftArrowIcon;
