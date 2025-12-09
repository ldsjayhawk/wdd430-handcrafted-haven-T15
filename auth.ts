import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const isProd = process.env.NODE_ENV === "production";

export const { handlers, auth, signIn, signOut } = NextAuth({

  providers: [
    GitHub({
      // ⭐ uses different environment variables depending on dev/prod
      clientId: isProd 
        ? process.env.GITHUB_CLIENT_ID_PROD! 
        : process.env.GITHUB_CLIENT_ID_DEV!,
      clientSecret: isProd
        ? process.env.GITHUB_CLIENT_SECRET_PROD!
        : process.env.GITHUB_CLIENT_SECRET_DEV!,

      // ⭐ provider-level callbacks also split
      async profile(profile) {
        if (isProd) {
          console.log("Using PROD GitHub profile mapping");
          return {
            id: profile.id.toString(),
            name: profile.name,
          };
        } else {
          console.log("Using DEV GitHub profile mapping");
          return {
            id: profile.id.toString(),
            name: profile.name,
            devMode: true,
          };
        }
      },
    }),
  ],
});
