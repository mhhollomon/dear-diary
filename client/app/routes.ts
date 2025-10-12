import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
   index("routes/home.tsx"),
   route("/profile", "routes/profile.tsx"),
   route("/login", "routes/login.tsx"),
   route("/signup", "routes/signup.tsx"),
   route("/logout", "routes/logout.tsx"),
   route("/tour", "routes/tour.tsx"),
   route("/write", "routes/write.tsx"),

] satisfies RouteConfig;
