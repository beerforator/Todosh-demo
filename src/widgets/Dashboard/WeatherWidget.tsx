import { CloudyMiniIcon, SunCloudyIcon, SunCloudyMiniIcon, SunnyMiniIcon } from '@/shared/ui/Icons/WeatherIcons'

import styleD from '@/app/styles/MainContentStyles/DashboardPage.module.scss'

export const WeatherWidget = () => {
    return (
        <>
            <div className={styleD.weatherWidget_inner}>
                <div
                    className={styleD.weatherWidget_section}
                    style={{ flexWrap: 'wrap-reverse' }}
                >
                    <SunCloudyIcon />
                    <div className={styleD.weatherWidget_temperature}>
                        <p style={{ fontSize: 40, fontWeight: 800 }}>19°</p>
                        <p style={{ fontSize: 14, fontWeight: 4 }}>Cloudy</p>
                    </div>
                </div>
                <div className={styleD.weatherWidget_section}>
                    <div className={styleD.weatherWidget_timeBlock}>
                        <p>Now</p>
                        <SunCloudyMiniIcon />
                        <p>19 °</p>
                    </div>
                    <div className={styleD.weatherWidget_timeBlock}>
                        <p>13:00</p>
                        <CloudyMiniIcon />
                        <p>19 °</p>
                    </div>
                    <div className={styleD.weatherWidget_timeBlock}>
                        <p>14:00</p>
                        <SunnyMiniIcon />
                        <p>20 °</p>
                    </div>
                    <div className={styleD.weatherWidget_timeBlock}>
                        <p>15:00</p>
                        <CloudyMiniIcon />
                        <p>21 °</p>
                    </div>
                </div>
            </div >
        </>
    )
}