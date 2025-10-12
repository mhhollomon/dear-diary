import { useAtomValue } from "jotai";
import { userAtom } from "~/atoms";
import { Welcome } from "~/component/welcome";
import WriteView from "~/component/writeView";

export default function Home() {
   const user = useAtomValue(userAtom);

/*    if (user) {
      return <Navigate to="/write" />
   }
 */
   return <>
      <title>My Online Diary</title>
      <meta property="og:title" content="My Online Diary" />
      <meta
         name="description" content="My Online Diary"
      />
      {user ? <WriteView /> : <Welcome />}
   </>;
}
