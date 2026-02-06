import { NavLink } from "react-router";
import Heading from "../components/Heading";
import SectionTitle from "../components/SectionTitle";

export default function ScoreInfo(){
    return(
        <>
            <Heading text="Score info" className="pb-0!" endText={
                <NavLink className='flex items-center gap-1 mr-2 md:mr-4' to={'/info'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    <p>Terug</p>
                </NavLink>
            }/>
            <div className="px-2">
                <SectionTitle step={1} text="Score per potje"/>
                <p>Elke speler krijgt per potje een score op basis van zijn eindpositie en het aantal spelers.</p>
                <div className="inline-block max-w-full rounded-xl bg-zinc-900 text-zinc-100 shadow-sm my-2">
                    <p className="px-4 py-2 text-sm font-mono overflow-x-auto leading-relaxed">
                        (<span className="text-amber-500">N</span> - <span className="text-purple-400">positie</span>) / (<span className="text-amber-500">N</span> - <span className="text-purple-400">1</span>)
                    </p>
                </div>
                <h3 className="text-xl">Voorbeeld (5 spelers):</h3>
                <ul className="list-disc ml-4">
                    <li>1e → 1.00</li>
                    <li>3e → 0.50</li>
                    <li>5e → 0.00</li>
                </ul>
                <SectionTitle step={2} text="Gemiddelde scores"/>
                <p>Van al deze scores wordt het gemiddelde genomen</p>
                <div className="inline-block max-w-full rounded-xl bg-zinc-900 text-zinc-100 shadow-sm my-2">
                    <p className="px-4 py-2 text-sm font-mono overflow-x-auto leading-relaxed">
                        <span className="text-purple-400">gemiddelde</span> = (som van scores) / aantal potjes
                    </p>
                </div>
                <SectionTitle step={3} text="Betrouwbaarheid"/>
                <p>Spelers met weinig potjes krijgen een lagere betrouwbaarheid.</p>
                <div className="inline-block max-w-full rounded-xl bg-zinc-900 text-zinc-100 shadow-sm my-2">
                    <p className="px-4 py-2 text-sm font-mono overflow-x-auto leading-relaxed">
                        <span className="text-purple-400">betrouwbaarheid</span> = potjes / (potjes + <span className="text-amber-500">K</span>)
                    </p>
                </div>
                <p className="mt-2"><span className="rounded p-1 text-sm font-mono bg-zinc-900 text-amber-500 shadow-sm my-4">K</span> is een vaste waarde (5).</p>
                <p className="mt-3">De betrouwbaarheid zorgt ervoor dat spelers met weinig potjes niet meteen bovenaan staan na 1 keer winnen.</p>
                <SectionTitle step={4} text="Eindscore"/>
                <div className="inline-block max-w-full rounded-xl bg-zinc-900 text-zinc-100 shadow-sm my-2">
                    <p className="px-4 py-2 text-sm font-mono overflow-x-auto leading-relaxed">
                        <span className="text-purple-400">eindscore</span> = gemiddelde x betrouwbaarheid x <span className="text-purple-400">100</span>
                    </p>
                </div>
                <p>De eindscore ligt dus tussen de 0 en 100.</p>
            </div>
        </>
    )
}