import { NavLink } from "react-router";
import logo from '../assets/logo.svg'

export default function Header() {
  // const auth = useAuth()
  return (
    <header className="w-full h-20 md:h-25 p-2 md:p bg-slate-100 flex flex-1">
      <nav className="flex flex-1 relative max-w-4xl mx-auto items-center">
        <NavLink to="/" className={"flex flex-1"}>
          <img src={logo} className="block m-0 p-0 h-15 md:h-20 w-auto"/> 
        </NavLink>
        {/* {auth.isAuthenticated &&
        <div className={"p-4 md:p-6 min-w content-center cursor-pointer"} onClick={() => auth.logout()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
        </div>} */}
      </nav>
    </header>
  );
}
