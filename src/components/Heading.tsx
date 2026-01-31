interface HeadingProps {
    text: string;
    subtitle?: string;
    className?: string;
}

export default function Heading({text, subtitle, className}: HeadingProps){
    return (
        <div className={`pl-2 pb-2 md:pb-4 ${className}`}>
            <h1 className='text-3xl md:text-5xl md:pb-2'>{text}</h1>
            <p className='text-md'>{subtitle}</p>
        </div>
    )
}