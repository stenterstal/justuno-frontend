import { NavLink } from "react-router";
import Logo from "../assets/logo.svg?react";

export default function Header() {
  return (
    <header className="w-full h-20 md:h-25 bg-slate-100">
      <nav className="max-w-4xl mx-auto h-full flex items-center pl-8">
        <NavLink to="/" className="h-full flex items-center">
          <Logo className="h-full w-auto object-contain" />
        </NavLink>
      </nav>
    </header>
  );
}
