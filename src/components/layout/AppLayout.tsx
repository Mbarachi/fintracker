import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./sidebar/Sidebar";
import { Outlet } from "react-router-dom";

interface AppLayoutProps {
    children?: React.ReactNode;
    pageTitle?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-x-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Main content */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-4 md:p-10 bg-background-light min-h-screen overflow-y-auto overflow-x-hidden">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
