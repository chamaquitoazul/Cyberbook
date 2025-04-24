import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const backgroundColor = "#FFF2E1";
const inputColor = "#EAD8C0";
const inputFocusColor = "#d9c7ae";

// These are the default breakpoints
const breakpoints = {
  base: "0em", // 0px
  sm: "30em", // ~480px. em is a relative unit and is dependant on the font-size.
  md: "48em", // ~768px
  lg: "62em", // ~992px
  xl: "80em", // ~1280px
  "2xl": "96em", // ~1536px
};

export default extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    surface: "#d1bb9e",
    surfaceDarker: "#a79277",
    surfaceLighter: "#c9b397",
    background: backgroundColor,
  },
  breakpoints,
  components: {
    Tabs: {
      variants: {
        primary: {
          tab: {
            borderRadius: "20px",
            _selected: {
              color: "gray.800",
              bg: "surfaceDarker",
            },
          },
        },
      },
    },
    Progress: {
      variants: {
        primary: {
          filledTrack: {
            bg: "surfaceDarker",
          },
          track: {
            bg: "surface",
          },
        },
      },
    },
    Button: {
      variants: {
        primary: {
          bg: "surfaceDarker",
          color: "gray.800",
          _hover: { bg: "#a79277" },
          fontSize: "lg",
          borderRadius: "20px",
        },
      },
    },
    Input: {
      variants: {
        primary: {
          field: {
            bg: inputColor,
            _hover: { bg: inputFocusColor, borderColor: inputFocusColor },
            border: "2px solid",
            borderColor: inputColor,
            _focus: {
              bg: inputFocusColor,
              borderColor: "#a79277",
            },
            _placeholder: { color: "#5e503f" },
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        background: backgroundColor,
      },
    },
  },
});
