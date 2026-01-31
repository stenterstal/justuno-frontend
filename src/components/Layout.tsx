import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6 md:pt-10">
        <Outlet />
      </main>
    </>
  );
}
