'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();

  return (
    <>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Get ready to experience!
          <br className="max-mid:hidden" />
          <span className="orange_gradient text-center">
            Create and Manage memorable events
          </span>
        </h1>
        <p className="desc text-center mb-5">
          Easily create, manage, and deliver a memorable in-person or virtual
          event experience on a trusted platform.
        </p>
        {session?.user ? (
          <div className="flex flex-center mx-3 mb-5 mt-5 gap-4">
            <Link href="/create-event">
              <button className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mb-5">
                CREATE YOUR EVENT TICKETS
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mb-5">
                VIEW EVENTS
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-center mx-3 mb-5 mt-5 gap-4">
            <Link href="/dashboard/login">
              <button className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mb-5">
                CREATE YOUR EVENT TICKETS
              </button>
            </Link>
            <Link href="/dashboard/login">
              <button className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mb-5">
                VIEW EVENTS
              </button>
            </Link>
          </div>
        )}
        <div className="w-full  md:px-[20px] px-[10px] py-10 flex justify-center flex-col items-center">
          <h2 className="text-2xl orange_gradient">How it works?</h2>
          <div className="mt-10 event_layout">
            <div className="event_card">
              <div className="flex justify-between  gap-5">
                <div className="p-6 w-20 flex items-center justify-center h-20 border-gray-700  rounded-full mb-6 md:mb-auto">
                  <h1 className="text-5xl orange_gradient">1</h1>
                </div>
                <div>
                  <h2 className="md:text-3xl text-2xl mb-2  md:text-left  text-center font-bold">
                    Create an account
                  </h2>
                  <p className="md:text-left text-center opacity-50">
                    It is quick and hassle-free – get started in just a few
                    simple steps!
                  </p>
                </div>
              </div>
            </div>
            <div className="event_card">
              <div className="flex justify-between  gap-5">
                <div className="p-6 w-20 flex items-center justify-center h-20 border-gray-700  rounded-full mb-6 md:mb-auto">
                  <h1 className="text-5xl orange_gradient">2</h1>
                </div>
                <div>
                  <h2 className="md:text-3xl text-2xl mb-2  md:text-left  text-center font-bold">
                    Add an upcoming event
                  </h2>
                  <p className="md:text-left text-center opacity-50">
                    Create and manage your memorable events using Create Events
                  </p>
                </div>
              </div>
            </div>
            <div className="event_card">
              <div className="flex justify-between  gap-5">
                <div className="p-6 w-20 flex items-center justify-center h-20 border-gray-700  rounded-full mb-6 md:mb-auto">
                  <h1 className="text-5xl orange_gradient">3</h1>
                </div>
                <div>
                  <h2 className="md:text-3xl text-2xl mb-2  md:text-left  text-center font-bold">
                    Share your events
                  </h2>
                  <p className="md:text-left text-center opacity-50">
                    Share your ticketing link with friends, they register and
                    get their tickets, and you manage attendees.
                  </p>
                </div>
              </div>
            </div>
            <div className="event_card">
              <div className="flex justify-between  gap-5">
                <div className="p-6 w-20 flex items-center justify-center h-20 border-gray-700  rounded-full mb-6 md:mb-auto">
                  <h1 className="text-5xl orange_gradient">4</h1>
                </div>
                <div>
                  <h2 className="md:text-3xl text-2xl mb-2  md:text-left  text-center font-bold">
                    Edit your events
                  </h2>
                  <p className="md:text-left text-center opacity-50">
                    Delete or Edit event details from your Profile Page
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default Home;
