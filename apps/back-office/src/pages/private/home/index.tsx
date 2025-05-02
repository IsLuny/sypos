import { FaHome, FaInfoCircle } from "react-icons/fa";
import PageTitle from "../../../components/page-title";
import { Alert, Avatar } from "antd";
import { FaLocationDot } from "react-icons/fa6";

function Home() {
    return (
        <main className="flex flex-col gap-8">
            <PageTitle icon={<FaHome />} label="Início" />
            <section>
                <Alert
                    showIcon
                    icon={<FaInfoCircle />}
                    type="success"
                    message={
                        <>Você está no plano <strong>Canary</strong></>
                    }
                />
                <div className="grid grid-cols-[25%_1fr] gap-4">
                    <div className="flex bg-[var(--primary-color-transparent)] items-center gap-3 mt-2 p-4 border-[var(--secondary-color)] border-1 rounded-lg">
                        <Avatar size={64} style={{ backgroundColor: "var(--secondary-color)" }}><span className="text-2xl">JP</span></Avatar>
                        <div className="max-w-3/4">
                            <p className="text-xl overflow-hidden text-ellipsis whitespace-nowrap" title="João Pinho">João Pinho</p>
                            <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">Administrador</p>
                        </div>
                    </div>
                    <div className="flex bg-[var(--primary-color-transparent)] items-center gap-3 mt-2 p-4 border-[var(--secondary-color)] border-1 rounded-lg">
                        <FaLocationDot size={48} />
                        <div>
                            <p className="text-xl">Lanches Contro</p>
                            <p className="text-xs">Av. Paulista, 1811 - Bela Vista, São Paulo - SP, 01311-200</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;