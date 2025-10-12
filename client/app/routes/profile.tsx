import ProfileView from "~/component/profileView";

import { userAtom } from "~/atoms";

import { Navigate, useLocation } from "react-router";
import { useAtomValue } from "jotai";

export default function Profile() {

   const location = useLocation();
   const user = useAtomValue(userAtom);
   if (!user) {
      return <Navigate to="/login" state={{ from: location }} />;
   }

   return <>
      <title>My Online Diary - Profile</title>
      <meta property="og:title" content="My Online Diary - Profile" />,
      <meta
         name="description" content="My Online Diary - User Profile"
      />
      <ProfileView />
   </>;
}
