import stylePP from '@/app/styles/MainContentStyles/ProfilePage.module.scss'
import styleD from '@/app/styles/MainContentStyles/DashboardPage.module.scss'

export const ClockWidget = () => {
    return (
        <>
            <div className={styleD.clockWidget_inner}>
                <div className={styleD.clockWidget_clock}>
                    21:45
                </div>
                <div className={stylePP.sectionBlock_paragraphBlock + ' ' + styleD.clockWidget_textBlock}>
                    <p>Mon</p>
                    <p>22th</p>
                    <p>Aug</p>
                </div>
            </div>
        </>
    )
}