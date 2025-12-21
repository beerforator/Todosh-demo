import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppRouter } from "./providers/router/AppRouter"
import { LocalStorageSync } from "@/features/LocalStorageSync/LocalStorageSync";
import { useSelector } from "react-redux";
import { RootState } from "./providers/store/types";
import { useMemo } from "react";

const getDesignTokens = (mode: 'light' | 'dark', glass: boolean, gradient: string) => ({
    palette: {
        mode,
        glass,
        primary: {
            main: '#2962FF',
        },
        background: {
        },
        text: {
            primary: mode === 'light' ? '#343A40' : '#ffffff',
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
        h4: {
            fontWeight: 600,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                div {
                    margin: 0;
                    padding: 0;
                }

                p {
                    margin: 0;
                    padding: 0;
                }

                :root {
                    --backgroundGradient: ${gradient};
                    
                    --glass-color: ${glass ? 'rgba(241, 250, 255, .2)' : 'rgba(241, 250, 255, 1)'} ;
                    --glass-border: ${glass ? '1px solid rgba(255, 255, 255, 0.25)' : 'none'} ;

                    --textColor: ${mode === 'light' ? '#050711' : '#ffffff'};
                }

                body {
                    background: var(--backgroundGradient) !important;
                    background-attachment: fixed !important;
                    color: var(--textColor) !important;
                    
                    transition: background 3.3s ease, color 0.3s ease;
                }

                .paperBlock {
                    background-color: var(--glass-color) !important;
                    border: var(--glass-border) !important;
                }
                
                .drawerStyle {
                    :global(.MuiDrawer-paper) {
                        background-color: var(--glass-color) !important;
                        border: var(--glass-border) !important;
                    }
                }
            `,
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    position: 'absolute'
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    color: 'none'
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    width: "200px",
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    width: "200px",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0,
                    width: 0,
                    height: 0,
                    backgroundColor: '#17191b',
                },
                paper: {
                    backgroundColor: '#17191b',
                }
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    margin: 0,
                    paddingRight: "8px",
                    minWidth: 0,
                    width: '100%',
                    borderRadius: '8px',
                    outline: 'none',
                    border: 'none',
                    backgroundColor: '#E0E8EF',
                    borderWidth: 0
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    width: '30px',
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                    minWidth: 0
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
    },
});

function App() {
    const settings = useSelector((state: RootState) => state.settings);

    const theme = useMemo(() =>
        createTheme(getDesignTokens(settings.theme, settings.glass, settings.backgroundGradient)),
        [settings.theme, settings.glass, settings.backgroundGradient]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <LocalStorageSync />
            <AppRouter />
        </MuiThemeProvider>
    )
}

export default App
