import { NavLink } from "react-router";
import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header className="w-full h-20 md:h-25 p-2 md:p bg-slate-100 flex flex-1">
      <nav className="flex flex-1 relative max-w-4xl mx-auto items-center">
        <NavLink to="/" className={"flex flex-1"}>
          <img src={logo} className="block m-0 p-0 h-15 md:h-20 w-auto"/> 
        </NavLink>
      </nav>
    </header>
  );
}
