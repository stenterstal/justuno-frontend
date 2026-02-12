import { useNavigate } from "react-router"
import MonthPicker from "./MonthPicker"

export default function BottomBar(dates: {min: string, max: string}){
    const navigate = useNavigate()

    return (
        <div className="w-full h-15 md:h-20 fixed bottom-0 left-0 right-0 bg-slate-100 flex">
            <div className="flex flex-1 relative max-w-4xl mx-auto">
                {dates && <div className="flex flex-1 pl-8"><MonthPicker minDate={dates.min} maxDate={dates.max}/></div>}
                {/* <input type="month" id="start" name="start" min="2018-03" defaultValue="2018-05" className="flex-1 pl-8 outline-none" /> */}
                <button onClick={() => navigate('/new')}
                    className='bg-emerald-500 hover:bg-emerald-600 px-8
                     text-white h-full cursor-pointer right-0'>
                    Nieuw spel
                </button>
            </div>
        </div>
    )
}