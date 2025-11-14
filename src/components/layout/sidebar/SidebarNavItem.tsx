import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
    icon: LucideIcon;
    label: string;
    to?: string; // optional route
    onClick?: () => void; // optional action
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ icon: Icon, label, to, onClick }) => {
    // If there's a route, use NavLink
    if (to) {
        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 ${isActive ? "bg-primary/20 text-primary" : "text-text-light-secondary hover:bg-gray-100"
                    }`
                }
            >
                <Icon className="w-5 h-5" />
                <p className="text-sm font-medium">{label}</p>
            </NavLink>
        );
    }

    // If no route, use a button-like div for actions (like logout)
    return (
        <div
            role="button"
            onClick={onClick}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-light-secondary hover:bg-gray-100 cursor-pointer"
        >
            <Icon className="w-5 h-5" />
            <p className="text-sm font-medium">{label}</p>
        </div>
    );
};
