const CartSucessIcon = (props) => {
  return (
    <div>
      <svg
        width={38}
        height={38}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          x={1}
          y={1}
          width={36}
          height={36}
          rx={18}
          stroke="#13C29A"
          strokeOpacity="0.5"
          strokeWidth={2}
        />
        <path
          d="M27 13L16 24L11 19"
          stroke="#13C29A"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.8785 1.28881C23.5077 0.368053 20.9761 -0.0673427 18.4339 0.00843517L18.4929 1.98803C20.7701 1.92015 23.0378 2.31017 25.1615 3.13495L25.8785 1.28881Z"
          fill="#13C29A"
        />
      </svg>
    </div>
  );
};

export default CartSucessIcon;
