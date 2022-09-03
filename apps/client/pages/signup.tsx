import { useSignUpEmailPassword } from '@nhost/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import PublicLayout from '../components/publicLayout';
import type { NextPageWithLayout } from './_app';

const SignUp: NextPageWithLayout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignUpEmailPassword();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    await signUpEmailPassword(email, password, {
      displayName: `${firstName} ${lastName}`.trim(),
      metadata: {
        firstName,
        lastName,
      },
    });
  };

  if (isSuccess) {
    router.push('/');
    return null;
  }

  const disableForm = isLoading || needsEmailVerification;

  return (
    <div>
      <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">
        Register
      </h2>

      {needsEmailVerification ? (
        <p className="text-center">
          Please check your mailbox and follow the verification link to verify
          your email.
        </p>
      ) : (
        <form
          onSubmit={handleOnSubmit}
          className="max-w-lg border rounded-lg mx-auto"
        >
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label
                htmlFor="firstName"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                First Name
              </label>
              <input
                name="firstName"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={disableForm}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                Last Name
              </label>
              <input
                name="lastName"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={disableForm}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label
                htmlFor="email"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disableForm}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                New Password
              </label>
              <input
                name="password"
                type="password"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disableForm}
                required
              />
            </div>

            {isError ? <p>{error?.message}</p> : null}

            <button
              type="submit"
              disabled={disableForm}
              className="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              {isLoading ? 'Loading...' : 'Create account'}
            </button>
          </div>

          <div className="flex justify-center items-center bg-gray-100 p-4">
            <p className="text-gray-500 text-sm text-center">
              Already have an account?{' '}
              <Link href="/signin">
                <a className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100">
                  Sign in
                </a>
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SignUp;
