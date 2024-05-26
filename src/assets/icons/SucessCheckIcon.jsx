
const SucessCheckIcon = (props) => {
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
        <g filter="url(#filter0_dd_1660_10548)">
          <rect x={3} y={2} width={32} height={32} rx={16} fill="#0CC348" />
          <path
            d="M26.2203 12.3765C26.5643 12.6823 26.5953 13.209 26.2895 13.553L17.4006 23.553C17.2425 23.7309 17.0158 23.8327 16.7778 23.8327C16.5398 23.8327 16.3131 23.7309 16.1549 23.553L11.7105 18.553C11.4047 18.209 11.4357 17.6823 11.7797 17.3765C12.1237 17.0708 12.6504 17.1017 12.9562 17.4457L16.7778 21.745L25.0438 12.4457C25.3496 12.1017 25.8763 12.0708 26.2203 12.3765Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_dd_1660_10548"
            x={0}
            y={0}
            width={38}
            height={38}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={1} />
            <feGaussianBlur stdDeviation="1.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0.08 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1660_10548"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="0.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0 0.101961 0 0 0 0.08 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_1660_10548"
              result="effect2_dropShadow_1660_10548"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_1660_10548"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default SucessCheckIcon;
