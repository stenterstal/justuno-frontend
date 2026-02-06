interface SectionTitleProps {
    step: number;
    text: string;
}

export default function SectionTitle({step, text}: SectionTitleProps){
    return(
        <h1 className="text-lg my-1 font-semibold mt-4 md:mt-6"><span className="text-green-600">Stap {step}:</span> {text}</h1>
    )
}