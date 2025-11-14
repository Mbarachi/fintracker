import React from "react";
import { Home, Wallet, BarChart2, Settings, LogOut } from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";
import { useLogout } from "@/hooks/useLogout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const logoutMutation = useLogout();
    const { data: user } = useCurrentUser()
    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg p-4 flex flex-col justify-between transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:static md:translate-x-0 md:flex flex-col justify-between border-r border-border-light`}
            >

                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 px-3 py-2 text-text-light-primary">
                        <Wallet />
                        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">FinTrack</h2>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <SidebarNavItem icon={Home} label="Dashboard" to="/dashboard" />
                        <SidebarNavItem icon={Wallet} label="Transactions" to="/transactions" />
                        <SidebarNavItem icon={BarChart2} label="Reports" />
                        <SidebarNavItem icon={Settings} label="Settings" />
                    </nav>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="border-t border-border-light pt-4">
                        <SidebarNavItem icon={LogOut} label="Log Out" onClick={() => logoutMutation.mutate()} />
                    </div>
                    <div className="flex gap-3 items-center">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhYSBKyOTh1HJ3h2PxF0Ktakwa2Gbq7jn3CYvxL1nHnKfNm9wL9hIV803qks-trprvQQOAjfWSpugsuUO-J3mRZsQ4xHzO-_2IaX-T8kDtg5XEL5ruV9Veafmcm6gT_ajZIDdyUVTfIo9oGZRGH4aPKfbGz2h9CMgqRTsRWyC0AaYiQdUnveb0o3Ke0ki3wOzDCXK3pQLTeIvgbL39V6MXybXMJmxOHsQNmiTrY_3q3wF-n0fEpnK8bOQCP8VtvTBIEW0QG1cEmBo")',
                            }}
                        ></div>
                        <div className="flex flex-col">
                            <h1 className="text-text-light-primary text-sm font-semibold leading-normal">{user?.firstName + " " + user?.lastName}</h1>
                            <p className="text-text-light-secondary text-xs font-normal leading-normal">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};