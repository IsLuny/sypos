import { Dispatch, SetStateAction } from "react";

import useWindowDimensions from "../../hooks/use-window-dimensions";

import { Avatar, Popover } from "antd";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { FaKey } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

import IconLabel from "../icon-label";
import SidebarMenu from "./menu";

import logo from "@/assets/logo-black.svg";

const Sidebar = ({ expanded, setExpanded }: { expanded: boolean, setExpanded: Dispatch<SetStateAction<boolean>> }) => {
    const dimensions = useWindowDimensions();
    const smallScreen = dimensions.width <= 1230;

    return (
        <nav className={`
            ${expanded ? "w-[250px]" : smallScreen ? "w-0" : "w-20"} 
            ${smallScreen ? "h-[calc(100vh-80px)]" : "h-full"} max-h-screen
            grid bg-[var(--white)] grid-rows-[auto_auto_1fr_auto] justify-center text-black shadow-2xl gap-6 py-4 transition-all duration-200 overflow-hidden
            ${smallScreen ? "absolute top-0 z-99 mt-20" : ""}
        `}>
            {!smallScreen && <div className="flex h-10 items-end justify-center text-xl gap-2">
                <img src={logo} alt="Sypos Logo" className="w-10 h-10" />
                {expanded && <h1>Sypos</h1>}
            </div>}
            <div className={`max-w-full grid ${expanded && "grid-cols-[auto_1fr_auto]"} justify-center items-center gap-3 px-4`}>
                <Avatar size={48} style={{ backgroundColor: "var(--secondary-color)" }}><span className="text-base">JP</span></Avatar>
                {expanded && (
                    <>
                        <div className="max-w-[120px]">
                            <p className="text-xl overflow-hidden text-ellipsis whitespace-nowrap" title={"João Pinho"}>João Pinho</p>
                            <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">Administrador</p>
                        </div>
                        <Popover
                            placement="right"
                            content={<>
                                <ul className="flex flex-col list-none gap-2">
                                    <li className="select-none cursor-pointer">
                                        <IconLabel icon={<FaKey />} label="Alterar minha senha" />
                                    </li>
                                    <li className="select-none cursor-pointer">
                                        <IconLabel icon={<LuLogOut />} label="Sair" />
                                    </li>
                                </ul>
                            </>}
                        >
                            <IoMdMore size={24} />
                        </Popover>
                    </>
                )}
            </div>
            <SidebarMenu expanded={expanded} />
            <div className="flex justify-center text-center text-black font-bold" onClick={() => setExpanded((v) => !v)}>
                {
                    smallScreen
                        ? <></>
                        : expanded
                            ? <MdKeyboardArrowLeft size={28} />
                            : <MdKeyboardArrowRight size={28} />
                }
            </div>
        </nav>
    );
}

export default Sidebar;