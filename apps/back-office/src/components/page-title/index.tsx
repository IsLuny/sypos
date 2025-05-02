import { ReactElement } from "react";

const PageTitle = ({ icon, label }: { icon: ReactElement, label: string }) => {
    return (
        <header className="flex items-center gap-4">
            <span className="bg-[var(--secondary-color)] p-2 text-3xl text-white rounded-xl">
                {icon}
            </span>
            <span className="text-2xl font-medium">{label}</span>
        </header>
    );
}

export default PageTitle;