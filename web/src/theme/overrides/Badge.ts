import { Theme } from "@mui/material";

export function Badge(theme: Theme) {
  return {
    MuiBadge: {
      styleOverrides: {
        standard: {
          minWidth: theme.spacing(2),
          height: theme.spacing(2),
          padding: theme.spacing(0.5)
        }
      }
    }
  };
}
