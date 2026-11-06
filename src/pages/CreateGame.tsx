import { useState, type KeyboardEvent, type SubmitEvent } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import type { CreateGameData } from "../loaders/createGameLoader";
import { playerApi } from "../api/player";
import { ApiError } from "../lib/apiClient";
import Heading from "../components/Heading";
import Modal from "../components/Modal";


function CreateGame(){
    const navigate = useNavigate();
    const location = useLocation();
    const { players: loadedPlayers, previousPlayers } = useLoaderData() as CreateGameData;

    const [players, setPlayers] = useState<string[]>(loadedPlayers.map((p) => p.name))
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>(location.state?.players || []);
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newPlayerName, setNewPlayerName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const hasEnoughPlayers = selectedPlayers.length >= 2;

    const query = search.trim().toLowerCase();
    const visiblePlayers = [...players]
      .sort()
      .filter((player) => player.toLowerCase().includes(query));


    const togglePlayer = (playerName: string) => {
      setSelectedPlayers((prevSelected) =>
        prevSelected.includes(playerName)
          ? prevSelected.filter((name) => name !== playerName)
          : [...prevSelected, playerName]
      );
    };

    // Tapping a match also clears the search, so the next name can be typed right away
    const handlePlayerClick = (playerName: string) => {
      togglePlayer(playerName);
      if (query) setSearch("");
    };

    // Enter toggles the first match, so names can be typed one after another
    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter" || !query) return;
      e.preventDefault();

      if (visiblePlayers.length > 0) {
        togglePlayer(visiblePlayers[0]);
        setSearch("");
      }
    };

    const selectPreviousPlayers = () => {
      setSelectedPlayers(previousPlayers.filter((name) => players.includes(name)));
    };

    const openModal = (name: string = "") => {
        setNewPlayerName(name)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setNewPlayerName("")
        setError(null)
    }

    const handleNewPlayer = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await playerApi.createPlayer(newPlayerName)
            const name = response.data.name

            // Add new player and also make him selected
            setPlayers(players => [...players, name]);
            setSelectedPlayers(selectedPlayers => [...selectedPlayers, name]);
            setSearch("");
            closeModal()

        } catch (err) {
            if (err instanceof Response) {
                navigate("/login");
            } else if (err instanceof ApiError && err.status === 400) {
                setError("Ongeldige naam of speler bestaat al");
            } else {
                console.error(err);
                setError("Toevoegen mislukt, probeer het opnieuw");
            }
        }
    }

    return (
        <>
          <Heading text="Nieuw spel" subtitle='Selecteer spelers' endText={
            previousPlayers.length > 0 &&
              <button className="flex items-center gap-1 mr-2 md:mr-4 cursor-pointer" onClick={selectPreviousPlayers}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <p>Vorige spelers</p>
              </button>
          }/>
          <div className="relative mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="search"
              className="bg-white p-4 pl-12 rounded-2xl w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Zoek speler"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
          <ul className="flex flex-col gap-3 mb-20 md:mb-24">
            {visiblePlayers.map((player) => (
            <li key={player} className={`p-4 rounded-2xl cursor-pointer transition-all overflow-hidden
                ${selectedPlayers.includes(player)
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-black"
                }`
            }
                // Keep focus (and the phone keyboard) on the search box while selecting
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handlePlayerClick(player)}>
                <p className="text-xl">{player}</p>
            </li>
            ))}
            {query && visiblePlayers.length === 0 &&
              <li className="p-4 rounded-2xl cursor-pointer bg-slate-100 text-gray-600"
                onClick={() => openModal(search.trim())}>
                <p className="text-xl">Voeg "{search.trim()}" toe</p>
              </li>
            }
          </ul>

          <div className="w-full h-15 md:h-20 fixed bottom-0 left-0 right-0 bg-slate-100 flex shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
            <div className="flex flex-1 max-w-4xl mx-auto">
              <button className="flex flex-1 items-center gap-2 pl-8 cursor-pointer"
                onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                Voeg toe
              </button>
              <button
                disabled={!hasEnoughPlayers}
                onClick={() => navigate('/game', {state: {selectedPlayers}})}
                className={`px-8 h-full transition-all ${
                  hasEnoughPlayers
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}>
                Start ({selectedPlayers.length})
              </button>
            </div>
          </div>

          <Modal
            title="Voeg speler toe"
            isOpen={isModalOpen}
            onClose={closeModal}>
            <form onSubmit={handleNewPlayer}>
              <input
                type="text"
                autoComplete="off"
                className="bg-slate-100 p-4 rounded-2xl mb-8 w-full"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder="Naam"
                autoFocus
                autoCapitalize="true"
                autoCorrect="none"
                spellCheck="false"
              />
              {error && <p className="text-red-500 -mt-6 mb-4 ml-2">{error}</p>}
              <button type="submit" className="bg-emerald-500 p-3 w-full rounded-xl text-white cursor-pointer">Voeg toe</button>
            </form>
          </Modal>
        </>
      )
}

export default CreateGame;
