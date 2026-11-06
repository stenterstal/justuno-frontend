import { redirect } from "react-router";
import { checkSession } from "../api/auth";

export async function redirectIfAuthenticated() {
  await checkSession().then((ok) => {
      if(ok){
          throw redirect("/");
      }
    })
}
