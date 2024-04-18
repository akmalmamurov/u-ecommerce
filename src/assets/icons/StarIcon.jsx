import { Fragment } from "react";

const StarIcon = (props) => {
  return (
    <Fragment>
      <svg
        width={10}
        height={10}
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#clip0_4102_20094)">
          <path
            d="M5.00016 0.833313L6.28766 3.44165L9.16683 3.86248L7.0835 5.89165L7.57516 8.75831L5.00016 7.40415L2.42516 8.75831L2.91683 5.89165L0.833496 3.86248L3.71266 3.44165L5.00016 0.833313Z"
            fill="#FABC13"
            stroke="#FABC13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_4102_20094">
            <rect width={10} height={10} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Fragment>
  );
};

export default StarIcon;
