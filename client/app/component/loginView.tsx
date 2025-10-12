import { SubTitle,Field, Control, Input, Button, Box, Title } from "@allxsmith/bestax-bulma";
import {  useAtomValue } from "jotai";
import { Form } from "react-router";
import { loginErrorMessageAtom, userAtom } from "~/atoms";



export default function LoginView() {
   const loginMessage = useAtomValue(loginErrorMessageAtom);
   const user = useAtomValue(userAtom);
   if (user) {
      return <Title>Already Logged in</Title>
   }

   return <>
      {loginMessage && <Box color="warning">
         <p>{loginMessage}</p>
      </Box>}
      <SubTitle>
         Please Log in
      </SubTitle>
         <Form method="post" action="/login">
         <Field horizontal label="Username">
            <Control>
               <Input placeholder="username" name="username" />
            </Control>
         </Field>
         <Field horizontal label="Password">
            <Control>
               <Input type="password" />
            </Control>
         </Field>
         <Button color="primary" key="login" type="submit" isLight >Login</Button>
      </Form>
   </>;
}
