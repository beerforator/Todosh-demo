import style from '@/app/styles/IconStyles.module.scss'

interface ListCircleIconProps {
    color: string
}

export const ListCircleIcon = ({ color }: ListCircleIconProps) => {
    return (
        <div className={style.filterCircle_container}>
            <div
                className={style.filterCircleStyle + ' ' + style.allIconStyle}
                style={{ backgroundColor: color }}
            ></div>
        </div>
    )
}

interface CircleCalendarIconProps {
    color: string,
    isFull: boolean,

    onContextMenu?: (e: React.MouseEvent) => void
}

export const CircleCalendar = ({ color, isFull, onContextMenu}: CircleCalendarIconProps) => {
    return (
        <div
            className={style.filterCircle_container}
            onContextMenu={onContextMenu}
            style={{ width: "12px", height: "12px" }}
        >
            <div
                className={style.circleStyleCalendar + ' ' + style.allIconStyle}
                style={isFull ? { backgroundColor: color, borderColor: color } : { borderColor: color }}
            ></div>
        </div>
    )
}