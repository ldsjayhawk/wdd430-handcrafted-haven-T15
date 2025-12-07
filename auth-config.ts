import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnArtisan = nextUrl.pathname.startsWith('/artisans');
            if (isOnArtisan) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/artisan', nextUrl));
            }
            return true;
        },
    },
    providers: [], 
} satisfies NextAuthConfig;