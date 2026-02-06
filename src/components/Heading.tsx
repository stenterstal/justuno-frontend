import type { ReactNode } from "react";

interface HeadingProps {
    text: string;
    subtitle?: string;
    className?: string;
    endText?: ReactNode;
}

export default function Heading({text, subtitle, className, endText}: HeadingProps){
    return (
        <div className={`flex items-center pl-2 pb-2 md:pb-4 ${className}`}>
            <div className="flex flex-col flex-1">
                <h1 className='text-3xl md:text-5xl md:pb-2'>{text}</h1>
                <p className='text-md'>{subtitle}</p>
            </div>
            {endText}
        </div>
    )
}