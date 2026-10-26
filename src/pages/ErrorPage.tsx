import { NavLink, isRouteErrorResponse, useRouteError } from "react-router";
import Heading from "../components/Heading";

export default function ErrorPage(){
    const error = useRouteError();
    const notFound = isRouteErrorResponse(error) && error.status === 404;

    console.error(error);

    return (
        <>
            <Heading
                text={notFound ? "Niet gevonden" : "Er ging iets mis"}
                subtitle={notFound ? "Deze pagina bestaat niet" : "Probeer het later opnieuw"}
            />
            <NavLink to="/" className="inline-block ml-2 mt-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white py-4 px-6">
                Terug naar de stand
            </NavLink>
        </>
    )
}
