// import React from "react";
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between flex w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          width={40}
          height={40}
          src="/assets/images/logo.png"
          alt="logo"
          className="object-contain"
        ></Image>
        <p className="logo-text font-bold font-mono ">CamPrompts</p>
      </Link>

      {/* DeskTop Nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                alt="Profile"
                className="object-container rounded-full"
              ></Image>
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                >
                  Sign In
                </button>
              ))}
          </div>
        )}
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image}
              width={37}
              height={37}
              alt="Profile"
              className="object-container rounded-full"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            ></Image>
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
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
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
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                ></button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
