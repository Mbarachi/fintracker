import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="h-14 w-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;