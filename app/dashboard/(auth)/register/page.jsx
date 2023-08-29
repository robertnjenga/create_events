'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [error, seterror] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 &&
        router.push('/dashboard/login?success=Account has been created');
    } catch (error) {
      seterror(true);
    }
  };
  return (
    <div className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
      <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>
      <form className="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full mb-4"
          required
        />
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
        <button className="border border-black my-2 px-4 py-2 text-center bg-black w-full inline-block text-white transition-all  rounded-md hover:bg-white hover:text-black">
          Register
        </button>
      </form>
      {error && 'Something went wrong'}
      <p className="text-center mt-5">
        Already have an account? {''}
        <Link href="/dashboard//login" className="text-blue-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register; 
