'use client';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session.status === 'authenticated') {
    router.push('/dashboard');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn('credentials', {
      email,
      password,
    });
  };

  return (
    <div className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
      <h2 className="mb-5 text-2xl font-semibold">Log into your account</h2>
      <button
        type="button"
        className="login_btn flex flex-center"
        onClick={() => signIn('google')}
      >
        <span className="flex justify-start items-center gap-3">
          <Image
            src="/assets/images/google.png"
            width={30}
            height={30}
            className="mr-2"
            alt="google"
          />
          Login with Google
        </span>
      </button>
      <hr className="mt-4" />
      <p className="flex flex-center pt-5 mb-4">Or with email and password</p>
      <form className="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="password"
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full mb-4"
          required
        />
        <button className="login_btn">Sign In</button>
      </form>
      {/* {error && 'Something went wrong'} */}
      <p className="text-center mt-5">
        Don&apos;t have an account {''}
        <Link href="/dashboard/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
