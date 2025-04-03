import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import client from "../prisma/prismaClient";

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

async function verify(jwt_payload: any, done: Function) {
	try {
		const user = await client.user.findFirst({
			where: {
				id: jwt_payload.sub,
			},
		});

		if (user) {
			return done(null, { id: user.id, role: user.Role });
		} else {
			return done(null, false);
		}
	} catch (error) {
		return done(error, false);
	}
}

const JWTStrategy = new Strategy(opts, verify);

export default JWTStrategy;
