import { Typography } from "@mui/material"

import styleD from '@/app/styles/MainContentStyles/DashboardPage.module.scss'

export const NotificationsWidget = () => {
    return (
        <>
            <Typography variant="h6">Notifications</Typography>

            <div className={styleD.notificationsWidget_inner}>
                <div className={styleD.notificationsWidget_text}>
                    You have not<br />
                    notifications yet
                </div>
            </div>
        </>

    )
}