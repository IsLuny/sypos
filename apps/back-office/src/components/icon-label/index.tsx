import { HTMLProps, ReactElement } from "react";

const IconLabel = ({ icon, iconSize, label, className }: { icon: ReactElement, iconSize?: HTMLProps<HTMLElement>["className"], label: string, className?: HTMLProps<HTMLElement>["className"] }) => {
    return (
        <div className={`flex gap-2 items-center ${className}`}>
            <span className={iconSize}>{icon}</span>
            {label && <span>{label}</span>}
        </div>
    )
}

export default IconLabel;