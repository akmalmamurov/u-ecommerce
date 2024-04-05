import { useState } from "react";

export const useModal = () => {
  const [isopen, setIsopen] = useState(false);
  const open = () => setIsopen(true);
  const close = () => setIsopen(false);
  const toogle = () => setIsopen(!isopen);
  return {
    isopen,
    open,
    close,
    toogle,
  };
};
