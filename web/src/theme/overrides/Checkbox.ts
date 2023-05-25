import { Theme } from "@mui/material";

export function Checkbox(theme: Theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary[300]
        }
      }
    }
  };
}