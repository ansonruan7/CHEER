import { createTheme } from '@mui/material/styles';

export const websiteTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: 8.5,
                    textTransform: 'none',
                    '&.MuiButton-contained': {
                        backgroundColor: '#FFA500',
                        '&:hover': {
                            backgroundColor: 'red'
                        },
                    },
                    '&.MuiButton-outlined': {
                        color: '#fff',
                        backgroundColor: '#FFA500',
                        '&:hover': {
                            backgroundColor: 'red'
                        },
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '1.7rem',
                },
            },
        },
    },
    palette: {
        white: {
            main: '#fff',
        },
    },
    typography: {
        h1: {
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.5px',
            textTransform: 'capitalize',
            textAlign: 'center',
        },
    },
  });