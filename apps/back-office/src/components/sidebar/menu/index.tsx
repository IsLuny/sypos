import { ReactElement, ReactNode, useState } from "react";

import { Link, useLocation } from "react-router";

import { FaClipboardUser } from "react-icons/fa6";
import { ImStatsDots } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

let paths = [
    {
        icon: <FaHome />,
        label: "Início",
        path: "/"
    },
    {
        icon: <ImStatsDots />,
        label: "Resumo de vendas",
        path: "/salesreport"
    },
    {
        icon: <FaClipboardUser />,
        label: "Funcionários",
        path: "/employee",
        children: [
            { index: true, label: "Funcionários" },
            { path: "register", label: "Cadastrar novo" },
            { path: "hours", label: "Apontamento de Horas" }
        ]
    },
    {
        icon: <ImStatsDots />,
        label: "Resumo de vendas",
        path: "/salesreport"
    },
]

const SidebarMenu = ({ expanded }: { expanded: boolean }) => {
    const [accordions, setAccordions] = useState<{ menu: string, state: boolean }[]>([]);

    const toggleAccordion = (menu: string) => {
        setAccordions((prev) => {
            if (prev.find((a) => a.menu === menu)) {
                return prev.map((p) => {
                    if (p.menu === menu) return { ...p, state: !p.state };
                    return p;
                });
            }

            return [...prev, { menu: menu, state: true }];
        });
    }

    return (
        <ul className={`${expanded ? "w-[250px]" : "w-20"} transition-all duration-200 overflow-y-auto`}>
            {paths.map((p) => {
                const accordion = accordions.find((a) => a.menu === p.label) ?? null;
                const maxH = p.children ? `max-h-${Math.ceil((18 * p.children.length) / 10) * 10}` : "";

                return p.children ? (
                    <>
                        <MenuItem
                            accordion
                            expanded={expanded}
                            item={p}
                            onClick={() => toggleAccordion(p.label)}
                        >
                            <div className={`flex items-center ${expanded ? "justify-between" : "justify-center"}`}>
                                <MenuLabel icon={p.icon} label={expanded ? p.label : ""} expanded={expanded} />
                                {expanded && <MdKeyboardArrowRight size={18} className={`${accordion?.state ? "rotate-90" : ""} transition-all duration-800`} />}
                            </div>
                        </MenuItem>
                        <ul className={`
                            ${expanded ? "" : "absolute -mt-17 left-20 bg-[var(--white)] z-90"}
                            ${accordion?.state 
                                ? expanded ? maxH : "max-w-[250px]"
                                : expanded ? "max-h-0" : "max-w-0"
                            }
                            overflow-hidden ${expanded ? "transition-[max-height]" : "transition-[max-width]"} duration-800
                        `}>
                            {p.children.map((pp) => (
                                <MenuItem expanded={expanded} item={pp} path={pp.index ? p.path : `${p.path}/${pp.path}`}>
                                    <span className="w-full overflow-hidden whitespace-nowrap pl-6 pr-4">{pp.label}</span>
                                </MenuItem>
                            ))}
                        </ul>
                    </>
                ) : (
                    <MenuItem expanded={expanded} item={p}>
                        <MenuLabel icon={p.icon} label={expanded ? p.label : ""} expanded={expanded} />
                    </MenuItem>
                )
            })}
        </ul>
    )
}

const MenuLabel = ({ icon, label, expanded }: { icon: ReactElement, label: string, expanded: boolean }) => {
    return (
        <div className={`grid items-end gap-2 ${expanded ? "whitespace-nowrap grid-cols-[22px_1fr]" : "justify-center"}`}>
            <span className="text-xl">{icon}</span>
            {label && <span className="text-base/[14px]">{label}</span>}
        </div>
    )
}

const MenuItem = ({ onClick = () => {}, item, accordion, path, expanded, children }: { onClick?: () => void, item: any, accordion?: boolean, path?: string, expanded: boolean, children: ReactNode }) => {
    const location = useLocation();

    return (
        <Link to={accordion ? location.pathname : (path ?? item.path)}>
            <li
                className={`${expanded ? "pl-6 pr-4" : ""} py-6 select-none cursor-pointer transition-all duration-200 hover:bg-[#dbdad7]`}
                onClick={onClick}
            >
                {children}
            </li>
        </Link>
    );
}

export default SidebarMenu;