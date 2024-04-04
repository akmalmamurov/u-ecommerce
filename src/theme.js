import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoints: {
    base: "0em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  colors: {},
  fonts: {
    fAbhay: `AbhayaLibre,sans-serif`,
    fInter: `Inter,sans-serif`,
    fPoppins: `Poppins,sans-serif`,
    fSF: `SFPRODISPLAY,sans-serif`,
    fRevalia: `Revalia,sans-serif`,
  },
});
export default theme;
