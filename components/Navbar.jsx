import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Create Events Logo"
          className="object-contain"
          width={30}
          height={30}
        />
        <p className="logo_text">Create Events</p>
      </Link>
      {/* {Desktop Navigation} */}
      <div className="sm:flex hidden gap-5">
        <Link href="/create-event" className='nav_link'>Create Event</Link>
        <Link href="/dashboard" className='nav_link'>View Events</Link>

        {session?.user ? (
          <div className="flex gap-3 md:gap-5 text-gray-700">
            <span>Hi, {session?.user?.name}</span>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={
                  session?.user.image
                    ? session.user.image
                    : '/assets/images/logo.svg'
                }
                alt="profile"
                width={30}
                height={30}
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/dashboard/login" className="black_btn">
              Login
            </Link>
            <Link href="/dashboard/register" className="black_btn">
              Register
            </Link>
          </div>
        )}
      </div>
      {/* {Mobile Navigation} */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={
                session?.user.image
                  ? session.user.image
                  : '/assets/images/logo.svg'
              }
              alt="profile"
              width={30}
              height={30}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-event"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Event
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/login" className="black_btn">
              Login
            </Link>
            <Link href="/register" className="black_btn">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
