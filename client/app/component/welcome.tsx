import { Button, Buttons, Title, SubTitle } from '@allxsmith/bestax-bulma';
import { Link, useNavigate } from 'react-router';


export function Welcome() {
   const navigate = useNavigate();

   return <>
      <Title>
         My Online Diary
      </Title>
      <SubTitle>
         A cool online diary
      </SubTitle>
      <div className="my-5"><Link to="/tour">Take a tour</Link></div>
      <Buttons isCentered>
         <Button color="primary" key="login" isLight onClick={() => navigate("/login")}>Login</Button>
         <Button color="primary" key="signup" isLight onClick={() => navigate("/signup")}>Sign Up</Button>
      </Buttons>
   </>;

}
