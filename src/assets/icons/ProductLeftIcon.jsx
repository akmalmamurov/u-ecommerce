const ProductLeftIcon = (props) => {
  return (
    <div>
      <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          width={48}
          height={48}
          rx={24}
          transform="matrix(-1 0 0 1 48 0)"
          fill="#DCDCDC"
        />
        <path
          d="M28.1125 34L29.8875 32.225L21.6625 24L29.8875 15.775L28.1125 14L18.1125 24L28.1125 34Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default ProductLeftIcon;
