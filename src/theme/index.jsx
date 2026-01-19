import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans Khmer", "Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      fontVariationSettings: '"wdth" 79.4'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          fontFamily: '"Noto Sans Khmer", sans-serif !important',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans Khmer", sans-serif',
          fontVariationSettings: '"wdth" 79.4'
        }
      }
    }
  }
});

export default theme;
