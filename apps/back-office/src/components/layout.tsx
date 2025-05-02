import { useState } from "react";

import useWindowDimensions from "../hooks/use-window-dimensions";

import { IoMenu } from "react-icons/io5";

import { Outlet } from "react-router";
import Sidebar from "./sidebar";

import logo from "@/assets/logo-black.svg";

const Layout = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
    const dimensions = useWindowDimensions();

    return (
        <main className={`
            h-screen max-h-screen grid grid-cols-[auto_1fr] overflow-hidden transition-all duration-200
            max-[1231px]:grid-cols-1 max-[1231px]:grid-rows-[auto_1fr]
        `}>
            <section className="row-start-1 row-end-2 col-start-1 col-end-2">
                <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
                {dimensions.width <= 1230 && (
                    <nav className="relative flex items-center justify-center h-20 p-6 bg-[var(--white)]">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2" onClick={() => setSidebarExpanded((s) => !s)}>
                            <IoMenu size={32} />
                        </div>
                        <img src={logo} alt="Sypos Logo" className="w-15 h-15" />
                    </nav>
                )}
            </section>
            <section className="w-full h-full p-8 overflow-y-auto">
                <Outlet />
            </section>
        </main>
    );
}

export default Layout;