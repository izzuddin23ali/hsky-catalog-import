import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
  password: process.env.IRON_SECURE,
  cookieName: "hsky_import_app_session",
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 1, // 1 days
    secure: process.env.NODE_ENV === "development",
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
