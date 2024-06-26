
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  typography: {
    regular10: {
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: '16px'

    },
    regular12: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '15.22px'
    },
    thin13: {
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: '15.41px'
    },
    regular13: {
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: '15.6px'
    },
    medium13: {
      fontWeight: 500,
      fontSize: '23px',
      lineHeight: '27.6px',
    },
    regular14: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16.94px'
    },
    medium14: {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '16.59px'
    },
    regular16: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '18.96px'
    },
    bold16: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '18.96px'
    },
    large16: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '19.2px'
    },
    regular19: {
      fontWeight: 400,
      fontSize: '19px',
      lineHeight: '22.8px'
    },
    medium19: {
      fontWeight: 500,
      fontSize: '19px',
      lineHeight: '22.8px',
    },
    medium23: {
      fontWeight: 500,
      fontSize: '23px',
      lineHeight: '27.6px'
    },
    bold23: {
      fontWeight: 700,
      fontSize: '23px',
      lineHeight: '27.26px'
    }
  },
  palette: {
    //dark blue to light blue
    primary: {
      hower: '#9DF0F6',
      main: '#1868AF',
      howerfont: '#1D1D1D',
      mainfont: '#FCFCFC',
      howerborder: '#9DF0F6',
      mainborder: '#1868AF'
    },
    //white to light blue
    secondary: {
      hower: '#9DF0F6',
      main: '#FCFCFC',
      howerfont: '#1D1D1D',
      mainfont: '#1D1D1D',
      howerborder: '#1D1D1D',
      mainborder: '#1D1D1D'
    },
    font: {
      light: '#969696',
      main: '#1D1D1D',
      special: '#212B52'
    },
    error: {
      main: '#EA2B2B',
    },
    background: {
      default: '#FFFFFF',
      main:'#FCFCFC',
      
    }
  },
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "text.primary",
        },
      }
    },
    MuiInputBase: { 
      styleOverrides: {
        input: {
          padding: '5px', 
        }
      }
    },
    MuiOutlinedInput: { 
      styleOverrides: {
        root: {
          borderRadius: '5px', 
        },
        notchedOutline: { 
          '&.Mui-focused': {
            borderColor: 'primary.main', 
          },
        }
      }
    },
    MuiSelect: { 
      styleOverrides: {
        select: {
          '&:focus': { 
            borderRadius: '5px',
            borderColor: 'primary.main', 
          }
        },
        icon: { 
          color: 'primary.main' 
        }
      }
    }
  }
});
export default theme;
