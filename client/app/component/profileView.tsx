import { Title, SubTitle, Field } from "@allxsmith/bestax-bulma";
import { useAtomValue } from "jotai";
import { Form } from "react-router";
import { userAtom } from "~/atoms";
import { DayStart } from "~/types/UserData";


export default function ProfileView() {

   const user = useAtomValue(userAtom);
   const dayStart = user?.dayStart || DayStart['12am'];

   return <>
      <Title>
         My Profile
      </Title>
      <Form>
         <Field horizontal label="Username">
            <p>{user?.userId}</p>
         </Field>
         <Field horizontal label="Email">
            <p>{user?.email}</p>
         </Field>
         <Field horizontal label="Timezone">
            <p>{user?.timezone}</p>
         </Field>
         <Field horizontal label="Day Start">
            <p>{DayStart[dayStart]}</p>
         </Field>
      </Form>

   </>;
}
