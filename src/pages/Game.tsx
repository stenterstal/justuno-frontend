import { useLocation, useNavigate } from "react-router";

interface GameProps {
    players?: string[]
}

export default function Game(){
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedPlayers } = location.state || {};

    // Failsafe
    if(selectedPlayers == undefined || selectedPlayers.length < 2){
        alert("Can't start game without players")
        navigate('/new')
    }

    return(
        <>
            {selectedPlayers}
        </>
    )
}