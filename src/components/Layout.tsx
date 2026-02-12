import { Outlet } from "react-router";
import Header from "../components/Header";
import { useAuth } from "../auth/AuthProvider";

export default function Layout() {
  const {loaded} = useAuth()
  console.log(loaded)
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6 md:pt-10">

        {!loaded ? (
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent"></div>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
}
