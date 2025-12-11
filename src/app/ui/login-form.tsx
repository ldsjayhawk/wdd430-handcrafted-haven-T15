'use client';
 
import { inter } from '@/app/ui/fonts';
import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import styles from "./page.module.css";

 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/'; //add dashboard
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className={styles.page}>
      <form action={formAction} className={styles.form}>
        <div className={styles.main}>
          <h1>
            Please log in to continue.
          </h1>
          <div className="">
            <div>
              <label
                className=""
                htmlFor="username"
              >
                User Name
              </label>
              <div className="">
                <input
                  className={styles.input}
                  id="username"
                  type="text"
                  name="username"
                  required
                />
              </div>
            </div>
            <div className="">
              <label
                className=""
                htmlFor="password"
              >
                Password
              </label>
              <div className="">
                <input
                  className={styles.input}
                  id="password"
                  type="password"
                  name="password"
                  required
                  minLength={3}
                />
              </div>
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <Button className="button" aria-disabled={isPending}>
            Log in
          </Button>
          <div
            className=""
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className={styles.icons} />
                <p className="">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}