const SearchIcon = (props) => {
  return (
    <div>
      <svg
        width={20}
        height={20}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M11.5078 19C15.9261 19 19.5078 15.4183 19.5078 11C19.5078 6.58172 15.9261 3 11.5078 3C7.08953 3 3.50781 6.58172 3.50781 11C3.50781 15.4183 7.08953 19 11.5078 19Z"
          stroke="#9C9C9C"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.5077 20.9999L17.1577 16.6499"
          stroke="#9C9C9C"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default SearchIcon;
