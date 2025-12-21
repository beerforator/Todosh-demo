import { UserIcon } from '@/shared/ui/Icons/HeaderIcons';

import { Box, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { ToggleSettingContainer } from '@/features/ToggleSetting/ToggleSettingContainer';
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setSettings, toggleTheme } from '@/app/providers/store/slices/settingsSlice';
import { updateUserSettings } from '@/app/services/settings/userApi';
import { GRADIENTS } from '@/shared/config/colors';

import styleMC from '@/app/styles/MainContentStyles/MainContent.module.scss'
import stylePP from '@/app/styles/MainContentStyles/ProfilePage.module.scss'
import style from '@/app/styles/IconStyles.module.scss'

export const ProfilePage = () => {
    const dispatch: AppDispatch = useDispatch()

    const glassMode = useSelector((state: RootState) => state.settings.glass);
    const currentGradient = useSelector((state: RootState) => state.settings.backgroundGradient);
    const [gradientAnchorEl, setGradientAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(gradientAnchorEl);


    const gradientName = GRADIENTS.find((gr) => gr.value === currentGradient)

    const handleOpenGradientMenu = (event: React.MouseEvent<HTMLElement>) => {
        setGradientAnchorEl(event.currentTarget);
    };

    const handleCloseGradientMenu = () => {
        setGradientAnchorEl(null);
    };

    const handleGradientSelect = (gradient: string) => {
        dispatch(setSettings({ backgroundGradient: gradient }));
        dispatch(updateUserSettings({ backgroundGradient: gradient }));
        handleCloseGradientMenu();
    }

    const handleThemeToggle = () => {
        // const newTheme = glassMode === 'light' ? 'dark' : 'light';
        const glass = !glassMode
        dispatch(toggleTheme());
        dispatch(updateUserSettings({ glass: glass }));
    };

    return (
        <>
            <div className={styleMC.listHeader}>
                <ListItemIcon>
                </ListItemIcon>
                <Typography variant="h4" gutterBottom>Profile</Typography>
            </ div>
            <div className={styleMC.staticView + ' ' + stylePP.profilePage_container}>

                <div className={stylePP.profilePage_section}>
                    <div className={'paperBlock ' + stylePP.sectionBlock}>
                        <div className={stylePP.sectionBlock_title}>
                            <Typography variant="h6">Profile</Typography>
                        </div>

                        <UserIcon className={stylePP.sectionBlockLogo + ' ' + style.allIconStyle} />

                        <div className={stylePP.sectionBlock_paragraphBlock}>
                            Test User
                        </div>

                        <div className={stylePP.sectionBlock_paragraphBlock}>
                            This is my description, i love web <br /> design so much
                        </div>

                        <button
                            disabled={false}
                        >
                            <ListItemText primary={"Log Out"} />
                        </button>

                    </div>
                    <div className={'paperBlock ' + stylePP.sectionBlock}>
                        <div className={stylePP.sectionBlock_title}>
                            <Typography variant="h6">Notifications</Typography>
                        </div>

                        <div
                            className={stylePP.sectionBlock_paragraphBlock}
                            style={{ alignItems: 'center' }}
                        >
                            There is no notifications yet
                        </div>

                    </div>
                </div>
                <div className={stylePP.profilePage_section} >
                    <div className={'paperBlock ' + stylePP.sectionBlock} style={{ height: '100%' }}>
                        <div className={stylePP.sectionBlock_title}>
                            <Typography variant="h6">Settings</Typography>
                        </div>

                        <div className={stylePP.sectionBlock_paragraph} style={{ opacity: '.4' }}>
                            <div className={stylePP.sectionBlock_paragraphText}>
                                <Typography variant="h6">Tasks</Typography>
                            </div>
                            <div className={stylePP.sectionBlock_paragraphBlock}>
                                <div>
                                    <div className={stylePP.sectionBlock_paragraphText}>
                                        <Typography variant="h6">Add new task to up</Typography>
                                    </div>
                                    <div>
                                        <ToggleSettingContainer isChecked={false} />
                                        <div className={stylePP.sectionBlock_paragraphText}>
                                            <Typography variant="h6">Off</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className={stylePP.sectionBlock_paragraphText}>
                                        <Typography variant="h6">Move up favourite tasks</Typography>
                                    </div>
                                    <div>
                                        <ToggleSettingContainer isChecked={false} />
                                        <div className={stylePP.sectionBlock_paragraphText}>
                                            <Typography variant="h6">Off</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className={stylePP.sectionBlock_paragraphText}>
                                        <Typography variant="h6">Asking before deleting</Typography>
                                    </div>
                                    <div>
                                        <ToggleSettingContainer isChecked={true} />
                                        <div className={stylePP.sectionBlock_paragraphText}>
                                            <Typography variant="h6">On</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className={stylePP.sectionBlock_paragraphText}>
                                        <Typography variant="h6">First week day is Monday</Typography>
                                    </div>
                                    <div>
                                        <ToggleSettingContainer isChecked={true} />
                                        <div className={stylePP.sectionBlock_paragraphText}>
                                            <Typography variant="h6">On</Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={stylePP.sectionBlock_paragraph}>
                            <div className={stylePP.sectionBlock_paragraphText}>
                                <Typography variant="h6">Outfit</Typography>
                            </div>
                            <div className={stylePP.sectionBlock_paragraphBlock}>
                                <div>
                                    <div className={stylePP.sectionBlock_paragraphText}>
                                        <Typography variant="h6">Glass styling</Typography>
                                    </div>
                                    <div>
                                        <ToggleSettingContainer
                                            onClick={handleThemeToggle}
                                            isChecked={glassMode}
                                        />
                                        <div className={stylePP.sectionBlock_paragraphText}>
                                            <Typography variant="h6">
                                                {glassMode
                                                    ? 'On'
                                                    : 'Off'}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className={stylePP.sectionBlock_paragraphText}>
                                        <Typography variant="h6">Background gradient</Typography>
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleOpenGradientMenu}
                                            style={{ padding: '6px 12px' }}
                                        >
                                            {gradientName?.name}
                                        </button>

                                        <Menu
                                            anchorEl={gradientAnchorEl}
                                            open={isMenuOpen}
                                            onClose={handleCloseGradientMenu}
                                        >
                                            {GRADIENTS.map((gradient) => (
                                                <MenuItem
                                                    key={gradient.name}
                                                    onClick={() => handleGradientSelect(gradient.value)}
                                                    selected={currentGradient === gradient.value}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 24,
                                                            height: 24,
                                                            borderRadius: '10px',
                                                            background: gradient.value || '#fff',
                                                            border: '1px solid #ccc',
                                                            mr: 2
                                                        }}
                                                    />
                                                    <ListItemText>{gradient.name}</ListItemText>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={stylePP.sectionBlock_paragraph} style={{ opacity: '.4' }}>
                            <div className={stylePP.sectionBlock_paragraphText}>
                                <Typography variant="h6">Notifications</Typography>
                            </div>
                            <div className={stylePP.sectionBlock_paragraphBlock}>
                                <div className={stylePP.sectionBlock_paragraphText}>
                                    <Typography variant="h6">Coming soon</Typography>
                                </div>
                            </div>
                        </div>

                        <div className={stylePP.sectionBlock_paragraph} style={{ opacity: '.4' }}>
                            <div className={stylePP.sectionBlock_paragraphText}>
                                <Typography variant="h6">Security</Typography>
                            </div>
                            <div className={stylePP.sectionBlock_paragraphBlock}>
                                <div className={stylePP.sectionBlock_paragraphText}>
                                    <Typography variant="h6">Coming soon</Typography>
                                </div>
                            </div>
                        </div>

                        <div className={stylePP.sectionBlock_paragraph + ' ' + stylePP.sectionBlock_lastParagraph}>
                            <div className={stylePP.sectionBlock_paragraphText}>
                                <Typography variant="h6">About</Typography>
                            </div>
                            <div className={stylePP.sectionBlock_paragraphBlock}>
                                <div className={stylePP.sectionBlock_paragraphText}>
                                    <Typography variant="h6">Confidentials</Typography>
                                </div>
                                <div className={stylePP.sectionBlock_paragraphText}>
                                    <Typography variant="h6">Export data</Typography>
                                </div>
                                <div className={stylePP.sectionBlock_paragraphText}>
                                    <Typography variant="h6">Something else</Typography>
                                </div>

                                <div className={stylePP.divider}></div>

                                <div className={stylePP.sectionBlock_paragraphText}>
                                    <Typography variant="h5" style={{ fontWeight: 600 }}>Todosh</Typography>
                                </div>
                                <div
                                    className={stylePP.sectionBlock_paragraphText}
                                    style={{ opacity: '.4', fontSize: '10px' }}
                                >
                                    <Typography variant="h5">@ 2025 Todosh. All rights reserved<br />0.0.1.10</Typography>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};