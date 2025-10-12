import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "~/atoms";
import LogoutView from "~/component/logoutView";

export default function Signup() {

   const setUser = useSetAtom(userAtom);

   useEffect(() => {
      setUser(null);
   }, [setUser]);

   return <>
      <title>My Online Diary - Logout</title>
      <meta property="og:title" content="My Online Diary - Logout" />
      <meta
         name="description" content="My Online Diary - Logout"
      />
      <LogoutView />
   </>;
}
