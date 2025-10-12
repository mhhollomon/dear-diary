import WriteView from "~/component/writeView";

import { loginErrorMessageAtom, userAtom } from "~/atoms";

import { Navigate, useLocation } from "react-router";
import { useAtomValue, useSetAtom } from "jotai";

export default function Write() {
   const location = useLocation();
   const user = useAtomValue(userAtom);
   if (!user) {
      return <Navigate to="/login" state={{ from: location }} />;
   }

   return <>
      <title>My Online Diary - Write</title>
      <meta property="og:title" content="My Online Diary - Write" />
      <meta
         name="description" content="My Online Diary - Write"
      />
      <WriteView/>
   </>;
}
