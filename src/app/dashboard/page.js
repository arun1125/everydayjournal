'use client'

import Header from '@/components/Header'
import { useAuth } from '@/context/AuthContext'
import useFetchAllEntries from '@/hooks/fetchAllEntries'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Dashboard() {

    const { currentUser } = useAuth()
    const {loading, error, allEntries} = useFetchAllEntries()
    const router = useRouter()
    const currentDate = new Date().toISOString().slice(0,10)

    if (!currentUser) {
        router.push('/')
    }

  return (
    <div className = 'flex flex-col items-center'>
        <Header/>
        <div>
            {
                !allEntries ? 
                <Link href = {{pathname: "/diaryentry",query: { date: currentDate }}}>
                    <div className="card w-full bg-gray-100 text-slate-900 duration-300 hover:opacity-40 cursor-pointer">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Write your first entry</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                            <button className="btn bg-slate-900 text-gray-100">Lets go</button>
                            </div>
                        </div>
                    </div>
                </Link>
                :
                <div>
                <Link href = {{pathname: "/diaryentry",query: { date: currentDate }}}>
                <div className="card w-full bg-gray-100 text-slate-900 duration-300 hover:opacity-40 cursor-pointer mb-4">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Write your todays entry</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        <button className="btn bg-slate-900 text-gray-100">Lets go</button>
                        </div>
                    </div>
                </div> 
                </Link>
                {allEntries.map((key, index) => {
                    return (
                        
                        <div key={index} className="card w-full bg-slate-700 text-gray-100 duration-100 hover:opacity-40 cursor-pointer mb-4">
                            <Link href = {{pathname: "/diaryentry",query: { date: currentDate }}}>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{Object.keys(key)[0]}</h2>
                                <p>{key[Object.keys(key)[0]]['grateful']}</p>
                                <div className="card-actions justify-end">
                                <button className="btn bg-slate-900 text-gray-100">Lets go</button>
                                </div>
                            </div>
                            </Link>
                        </div> 
                        
                    )
                })}
                </div>
            }
        </div>
    </div>
  )
}
