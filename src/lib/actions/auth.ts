'use server'

import { signIn, signOut } from '@auth' 

export const login = async () => {
    await signIn('github', {redirectTo: '/artisans'})
};

export const logout = async () => {
    await signOut({redirectTo: '/'})
};