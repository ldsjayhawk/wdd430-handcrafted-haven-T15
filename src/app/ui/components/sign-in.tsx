'use client'

import { login, logout } from '@/lib/actions/auth';

export default function LoginButton() {
    return (
        <form action={login}>
            <button className="icon-placeholder" type="submit">👤</button>
          </form>
    )
}