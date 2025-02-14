import React from "react";

interface InlineCodeProps {
    children: React.ReactNode
}

const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
    return(
        <code
            className="rounded 
                bg-gray-100
                px-1 py-0.5 
                font-mono 
                text-sm 
                text-red-500 
                dark:bg-gray-800 
                dark:text-red-400"
        >
            {children}
        </code>
    )
}

export default InlineCode