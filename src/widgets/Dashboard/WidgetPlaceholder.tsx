interface WidgetPlaceholderProps {
    className: string,
    children: React.ReactNode
}

export const WidgetPlaceholder = ({ className, children }: WidgetPlaceholderProps) => {
    return (
        <div
            className={'paperBlock ' + className + ' widgetPlaceholder'}
        >
            {children}
        </div>
    )
};