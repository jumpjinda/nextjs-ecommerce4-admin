import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const adminEmails = ["jumpjinda@gmail.com", "varisa.jinda@gmail.com"];
export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callback: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session.user.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
