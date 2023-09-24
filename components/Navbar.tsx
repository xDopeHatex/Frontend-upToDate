'use client'

import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders} from "next-auth/react";
import {LiteralUnion, ClientSafeProvider} from "next-auth/react";
import {BuiltInProviderType} from "@node_modules/next-auth/providers";





const Navbar = () => {
    const {data: session} = useSession()

    const isUserLoggedIn = true
    const [providers, setProviders] = useState(null);

    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {

        const setUpProviders = async () => {
            const response: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null = await getProviders()

            if (response !== null) {
                // @ts-ignore
                await setProviders(response)
            }

        }

        setUpProviders()


    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image src='/assets/images/logo.svg' height={30} width={30} alt='Frontend upToDate logo' className='object-contain'/>
                <p className='logo_text'>Frontend upToDate</p>
            </Link>
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5 '><Link href='/create-prompt' className='black_btn'>Create Post</Link>

                        <button type='button' onClick={() => signOut} className='outline_btn'>Sign Out</button>
                        <Link href='/profile'>
                            <Image src={ session.user.image ? session.user.image : `/assets/images/logo.svg`}  width={37} height={37} className='rounded-full' alt='profile'/>
                        </Link>

                    </div>
                ): (<>
                    {providers && Object.values(providers).map((provider: any) => {
                        return (
                            <button type='button' key={provider.name}
                            onClick={() => signIn(provider.id)}
                                    className='black_btn'
                            >
Sign In
                            </button>
                        )
                    })}
                </>)}
            </div>
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image src={ session.user.image ? session.user.image : `/assets/images/logo.svg`} height={37} width={37} alt='Frontend upToDate logo' className='object-contain'
                        onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link href="/Profile" className='dropdown_link' onClick={() => setToggleDropdown(false)}>
My Profile
                                </Link>
                                <Link href="/create-prompt" className='dropdown_link' onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button className='mt-5 w-full black_btn' type='button' onClick={() => {
                                setToggleDropdown(false);
                                signOut();}
                                }>Sign Out</button>
                            </div>
                        )}

                    </div>
                ) : (<>
                    {providers && Object.values(providers).map((provider: any) => {
                        return (
                            <button type='button' key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                            >

                            </button>
                        )
                    })}
                </>)}
            </div>
        </nav>
    );
};

export default Navbar;