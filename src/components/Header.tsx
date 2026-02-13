import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="w-full h-20 md:h-25 p-2 md:p bg-slate-100 flex flex-1">
      <nav className="flex flex-1 relative max-w-4xl mx-auto items-center">
        <NavLink to="/" className={"flex flex-1"}>
          {/* <img src={logo} className="block m-0 ml-4 md:ml-0 p-0 h-8 md:h-12 w-auto"/> */}
          <h1 className="block m-0 ml-4 md:ml-0 p-0 font-bold text-2xl">JUSTUNO</h1>
        </NavLink>
      </nav>
    </header>
  );
}
