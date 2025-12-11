import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
  ],
});

export const GET = handlers.GET;
export const POST = handlers.POST;