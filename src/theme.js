import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoints: {
    base: "0em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  colors: {
    lightBlue: "#0074EB33",
    black: "#000000",
    cascadWhite: "#F6F6F6",
    codexGrey: "#9C9C9C",
    skyBlue: "#0E73F6",
    white: "#ffffff",
    boilingAcid: "#00EE0A",
    manhatanMist: "#CDCFD0",
    deepBlack: "#1A2024",
  },
  fonts: {
    fAbhay: "AbhayaLibre,sans-serif",
    fInter: "Inter,sans-serif",
    fPoppins: "Poppins,sans-serif",
    fSF: "SFPRODISPLAY,sans-serif",
    fRevalia: "Revalia,sans-serif",
  },
});
export default theme;
