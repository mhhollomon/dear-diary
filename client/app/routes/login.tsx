import LoginView from "~/component/loginView";
import type { Route } from "./+types/login";
import { useSetAtom } from "jotai";
import { loginErrorMessageAtom, userAtom } from "~/atoms";
import { UserData } from "~/types/UserData";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export async function clientAction({ request }: Route.ClientActionArgs) {

   console.log("-- we got to clientAction");

   const formData = await request.formData();
   const username = formData.get("username");
   let new_user = new UserData();
   if (username) {
      new_user.userId = username.valueOf() as string;
      new_user.valid = true;
   } else {
      new_user.userId = '';
      new_user.valid = false;
      new_user.errorMsg = 'Missing username';
   }

   new_user.email = 'a@example.com';
   new_user.timezone = 'UTC';
   new_user.dayStart = 0;

   return new_user;
}


export default function Login({
         actionData,
         }: Route.ComponentProps) {

   const setUser = useSetAtom(userAtom);
   const setLoginMessage = useSetAtom(loginErrorMessageAtom);
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      console.log("-- we got to useEffect in Login");
      if (actionData) {
         console.log(`-- actionData: ${JSON.stringify(actionData)}`);
         if (actionData.valid === true) {
            setUser(actionData);
            const redirectTo = location.state?.from?.pathname || '/';
            navigate(redirectTo, { replace: true });
            setLoginMessage(null);
         } else {
            setUser(null);
            setLoginMessage(actionData.errorMsg);
            return;
         }
      }
   }, [actionData]);

   return <>
         <title>My Online Diary - Login</title>
         <meta property="og:title" content="My Online Diary - Login" />
         <meta name="description" content="My Online Diary - Login" />
         <LoginView />
      </>
}
