import React, { useEffect, useMemo, useRef } from 'react';

import { ListItemIcon, Typography } from '@mui/material';
import { DashboardPageIcon } from '@/shared/ui/Icons/SidebarIcons';
import { WidgetPlaceholder } from '@/widgets/Dashboard/WidgetPlaceholder';
import { TasksWidget } from '@/widgets/Dashboard/TasksWidget';
import { ImageWidget } from '@/widgets/Dashboard/ImageWidget';
import { ClendarWidget } from '@/widgets/Dashboard/ClendarWidget';
import { WeatherWidget } from '@/widgets/Dashboard/WeatherWidget';
import { NotificationsWidget } from '@/widgets/Dashboard/NotificationsWidget';
import { ProfileWidget } from '@/widgets/Dashboard/ProfileWidget';
import { CarWidget } from '@/widgets/Dashboard/CarWidget';
import { ClockWidget } from '@/widgets/Dashboard/ClockWidget';

import styleD from '@/app/styles/MainContentStyles/DashboardPage.module.scss'
import styleMC from '@/app/styles/MainContentStyles/MainContent.module.scss'

export const DashBoardPage = () => {
    return (
        <div>
            <div className={styleMC.listHeader}>
                <ListItemIcon>
                    <DashboardPageIcon />
                </ListItemIcon>
                <Typography variant="h4" gutterBottom>Dashboard</Typography>
            </ div>

            <div className={styleD.dashboardContainer}>
                <WidgetPlaceholder className={styleD.todayTasksWidget} >
                    <TasksWidget />
                </WidgetPlaceholder>
                <WidgetPlaceholder className={styleD.artWidget} >
                    <ImageWidget />
                </WidgetPlaceholder>
                <WidgetPlaceholder className={styleD.calendarWidget} >
                    <ClendarWidget />
                </WidgetPlaceholder>
                <WidgetPlaceholder className={styleD.weatherWidget} >
                    <WeatherWidget />
                </WidgetPlaceholder>
                <WidgetPlaceholder className={styleD.notificationsWidget} >
                    <NotificationsWidget />
                </WidgetPlaceholder>
                <WidgetPlaceholder className={styleD.profileWidget} >
                    <ProfileWidget />
                </WidgetPlaceholder>
                <WidgetPlaceholder className={styleD.carWidget} >
                    <CarWidget />
                </WidgetPlaceholder>
                <WidgetPlaceholder className={styleD.clockWidget} >
                    <ClockWidget />
                </WidgetPlaceholder>
            </div>
        </div>
    );
};