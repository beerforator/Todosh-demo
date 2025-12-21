import { UserIcon } from '@/shared/ui/Icons/HeaderIcons'

import styleD from '@/app/styles/MainContentStyles/DashboardPage.module.scss'
import stylePP from '@/app/styles/MainContentStyles/ProfilePage.module.scss'
import style from '@/app/styles/IconStyles.module.scss'

export const ProfileWidget = () => {
    return (
        <>
            <div className={styleD.profileWidget_inner}>
                <UserIcon className={stylePP.sectionBlockLogo + ' ' + style.allIconStyle} />
                <div className={styleD.profileWidget_texBlock}>
                    <div className={stylePP.sectionBlock_paragraphBlock + ' ' + styleD.profileWidget_texBlock}>
                        Test User
                    </div>
                    <div className={stylePP.sectionBlock_paragraphBlock + ' ' + styleD.profileWidget_texBlock}>
                        This is my description
                    </div>
                </div>
            </div>
        </>
    )
}