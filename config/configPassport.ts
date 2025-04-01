import passport from "passport";
import JWTStrategy from "./JWTStrategy";

export default function configPassport() {
	passport.use(JWTStrategy);
}
