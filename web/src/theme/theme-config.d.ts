import { ColorPalette } from "./palette";
import { CustomShadows } from "./shadows";
import { Typography } from "./typography";

declare module "@mui/material/styles" {
  export interface Theme {
    palette: ColorPalette;
    customShadows: ReturnType<typeof CustomShadows>;
    typography: ReturnType<typeof Typography>;
  }

  export interface ThemeOptions {
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      }
    }
    direction: string;
    mixins: {
      toolbar: {
        minHeight: number;
        paddingTop: number;
        paddingBottom: number;
      }
    };
    palette: ColorPalette;
    customShadows: ReturnType<typeof CustomShadows>;
    typography: ReturnType<typeof Typography>;
  }
}