'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
 
export default function Header() {
    
    const {logout} = useAuth()
    const router = useRouter()

  return (
        <div className="navbar bg-inherit text-gray-100 justify-between">
            <div className="navbar bg-inherit">
                <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">Everyday Seeker </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal">
                    <li>
                        <details>
                        <summary>
                            <i className="fa-solid fa-bars text-2xl"></i>
                        </summary>
                        <ul className="p-2 bg-gray-100 text-slate-900 z-10 sm:bg-inherit sm:text-gray-100 rounded-t-none sm:text-l text-left">
                            <li><Link href="/dashboard">Dashboard</Link></li>
                            <li onClick = {() => {
                                logout()
                                router.push('/')
                            }}><a>Sign Out</a></li>
                        </ul>
                        </details>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
  )
}
