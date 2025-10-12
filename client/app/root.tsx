import {
   isRouteErrorResponse,
   Links,
   Meta,
   Outlet,
   Scripts,
   ScrollRestoration,
   Link,
   NavLink,
} from "react-router";


import type { Route } from "./+types/root";
import 'bulma/css/bulma.min.css';
import "./app.css";
import { Navbar, NavbarMenu } from "@allxsmith/bestax-bulma";
import { useAtomValue } from "jotai";
import { userAtom } from "~/atoms";

export const links: Route.LinksFunction = () => [
   { rel: "preconnect", href: "https://fonts.googleapis.com" },
   {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
   },
   {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
   },
];

export function Layout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
         </head>
         <body>
            {children}
            <ScrollRestoration />
            <Scripts />
         </body>
      </html>
   );
}

export default function App() {

   const user = useAtomValue(userAtom);

   const loggedIn = user !== null;

   function navbarActive({ isActive }: { isActive: boolean }): string {
      return "navbar-item" + (isActive ? " active-link" : "");
   }

   return <>

      <Navbar color="primary">
         <NavbarMenu>
            <Navbar.End>
               <NavLink to="/" key="home" className={navbarActive}>
                  Home
               </NavLink>
               { loggedIn &&
                  <NavLink to="/profile" key="profile" className={navbarActive}>
                     Profile
                  </NavLink>}
               { !loggedIn && <>
                  <NavLink to="/login" key="login" className={navbarActive}>
                     Login
                  </NavLink>
                  <NavLink to="/signup" key="signup" className={navbarActive}>
                     Sign Up
                  </NavLink> </>
               }
               { loggedIn &&
                  <NavLink to="/logout" key="logout" className={navbarActive}>
                     Logout
                  </NavLink>
               }
            </Navbar.End>
         </NavbarMenu>
      </Navbar>

      <div className="container has-text-centered">
         <Outlet />
      </div>
   </>

}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
   let message = "Oops!";
   let details = "An unexpected error occurred.";
   let stack: string | undefined;

   if (isRouteErrorResponse(error)) {
      message = error.status === 404 ? "404" : "Error";
      details =
         error.status === 404
            ? "The requested page could not be found."
            : error.statusText || details;
   } else if (import.meta.env.DEV && error && error instanceof Error) {
      details = error.message;
      stack = error.stack;
   }

   return (
      <main className="pt-16 p-4 container mx-auto">
         <h1>{message}</h1>
         <p>{details}</p>
         {stack && (
            <pre className="w-full p-4 overflow-x-auto">
               <code>{stack}</code>
            </pre>
         )}
      </main>
   );
}
