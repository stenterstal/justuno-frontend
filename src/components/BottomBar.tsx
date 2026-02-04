import { useNavigate } from "react-router"

export default function BottomBar(){
    const navigate = useNavigate()
    return (
        <div className="w-full h-15 md:h-20 p-2 fixed bottom-0 left-0 right-0 bg-slate-100">
            <div className="flex flex-1 relative max-w-4xl mx-auto">
                <p>Date selector</p>
                 <button onClick={() => navigate('/new')}
                    className='bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white py-4 px-6 cursor-pointer'>
                    Nieuw spel
                </button>
            </div>
        </div>
    )
}