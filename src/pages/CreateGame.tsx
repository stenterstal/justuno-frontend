import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Modal from "../components/Modal";
import { usePlayerApi } from "../api/player";
import { useLocation, useNavigate } from "react-router";

function CreateGame(){
    const navigate = useNavigate();
    const location = useLocation();
    const { getPlayers, createPlayer } = usePlayerApi();

    const [players, setPlayers] = useState<string[]>([])
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>(location.state?.players || []);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newPlayerName, setNewPlayerName] = useState<string>("");

    const hasEnoughPlayers = selectedPlayers.length >= 2;

    useEffect(() => {
      const fetchPlayers = async () => {
        const response = await getPlayers();
        if(response.ok){
          setPlayers(response.data.map(player => player.name))
        }
      }
      fetchPlayers();
    }, [])

    const togglePlayer = (playerName: string) => {
      setSelectedPlayers((prevSelected) =>
        prevSelected.includes(playerName)
          ? prevSelected.filter((name) => name !== playerName)
          : [...prevSelected, playerName]
      );
    };
  

    const handleNewPlayer = async (e: any) => {
        e.preventDefault();

        try {
            const response = await createPlayer(newPlayerName)

            if (response.status == 400) {
                // setError("Onjuiste credentials")
                throw new Error("Add failed");
            }

            if (!response.ok) {
                // setError("Login faalde om onbekende reden")
                throw new Error("Add failed");
            }

            const name = await response.data.name

            // Add new player and also make him selected
            setPlayers(players => [...players, name]);
            setSelectedPlayers(selectedPlayers => [...selectedPlayers, name]);
            // Reset values
            setIsModalOpen(false)
            setNewPlayerName("")

        } catch (err: any) {
            throw new Error("Onbekende error")
            console.error(err);
        }
    }

    return (
        <>
          <Heading text="Nieuw spel" subtitle='Selecteer spelers'/>
          <ul className="grid grid-cols-2 gap-4">
            {players.sort().map((player) => (
            <li key={player} className={`p-4 rounded-2xl border-l-8 bg-white cursor-pointer transition-all
                ${selectedPlayers.includes(player)
                    ? "border-emerald-500 text-emerald-600"
                    : "border-white text-black"
                }`
            }
                onClick={() => togglePlayer(player)}>
                <p className="text-xl">{player}</p>
            </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white p-4 pl-6 rounded-2xl cursor-pointer transition-all items-center gap-1 flex justify-center"
              onClick={() => setIsModalOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                <p className="text-xl">
                  Voeg toe
                </p>
            </button>
            <button 
              disabled={!hasEnoughPlayers}
              onClick={() => navigate('/game', {state: {selectedPlayers}})}
              className={`flex-1 p4 py-4 text-xl rounded-2xl transition-all ${
                hasEnoughPlayers
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}>
              Start
            </button>
          </div>

          <Modal 
            title="Voeg speler toe"
            isOpen={isModalOpen} 
            onClose={() => {
              setIsModalOpen(false)
              setNewPlayerName("")
            }}>
            <form onSubmit={handleNewPlayer}>
              <input
                type="username"
                className="bg-slate-100 p-4 rounded-2xl mb-8 w-full"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder="Naam"
                autoFocus
                autoCapitalize="true"
                autoCorrect="none"
                spellCheck="false"
              />
              <button type="submit" className="bg-emerald-500 p-3 w-full rounded-xl text-white cursor-pointer">Voeg toe</button>
            </form>
          </Modal>
        </>
      )
}

export default CreateGame;