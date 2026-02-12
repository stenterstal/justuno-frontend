import { useState } from "react";
import Heading from "../components/Heading";
import { useLocation, useNavigate } from "react-router";
import { Navigate } from "react-router";
import { login } from "../api/auth";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    // const { login, isAuthenticated } = useAuth();

    // if(isAuthenticated){
    //     return <Navigate to="/" replace />;
    // }

    const from = (location.state as any)?.from?.pathname || "/";

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        login(username, password).then((ok) => {
            if(ok){
                navigate(from, { replace: true });
            } else {
                 setError("Login failed")
            }
        })
    };

    return(
        <>
            <Heading text="Login" className="mb-5"/>
            <form onSubmit={handleSubmit} className="flex flex-col">
            <input
                type="username"
                className="bg-slate-100 p-4 rounded-2xl mb-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Gebruikersnaam"
                autoCapitalize="none"
                autoCorrect="none"
                spellCheck="false"
            />
            <div className="relative mb-4">
                <input
                    className="bg-slate-100 p-4 rounded-2xl w-full"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Wachtwoord"
                    autoCapitalize="none"
                    autoCorrect="off"
                />

                <button type="button" onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showPassword ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    }
                </button>
            </div>
            {error && <p className="text-red-500 mb-4 ml-2">{error}</p>}
            <button type="submit" className="bg-emerald-500 p-4 rounded-xl text-white cursor-pointer">Login</button>
            </form>
        </>
    )
}