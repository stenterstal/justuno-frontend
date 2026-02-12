import { redirect } from "react-router";
import { refreshSession } from "../api/auth";

export async function redirectIfAuthenticated() {
  await refreshSession().then((ok) => {
      if(ok){
          throw redirect("/");
      }
    })
}
