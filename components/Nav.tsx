"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';
import { AppProvider } from 'next-auth/providers/index';


const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState<any>(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);


    useEffect(() => {
        const initProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        initProviders();
    }, []);
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Dwitter</p>
            </Link>

            {/* desktop nav */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link 
                            href="/create-dweet"
                            className="black_btn">
                            Create Dweet
                        </Link>

                        <button type="button" onClick={() => signOut()} className='outline_btn'>
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                                src={session?.user?.image || '/assets/images/default_profile.svg'}
                                alt="profile"
                                width={37}
                                height={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && (Object.values(providers) as AppProvider[]).map((provider) => (
                            <button
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                                type="button"
                            >
                                Sign In 
                            </button>
                        ))}   
                    </>
                )}
            </div>

            {/* mobile nav */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="logo"
                            className='rounded-full'
                            width={37}
                            height={37}
                            onClick={() => {setToggleDropdown((prev) => !prev)}}
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
                                    href="/create-dweet"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create dweet
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => { 
                                        signOut(); 
                                        setToggleDropdown(false);
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && (Object.values(providers) as AppProvider[]).map((provider: AppProvider) => (
                            <button
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                                type="button"
                            >
                                Sign In 
                            </button>
                        ))}   
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;