'use client'
import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function GoalTracker() {
  return (
    <div className="flex flex-col items-center space-y-2">
        <Header/>
        <div className="w-[80%] max-w-xl">
              <div className="card w-full bg-slate-800  test-gray-100 "> 
                
                <div className="card-body items-center">
                  
                  <h2 className="card-title  text-l sm:text-2xl">Goals</h2>

                  <h2>
                    <b>Toothbrusing Goals:</b> Things you have to do everyday. (Like working out) 
                  </h2>
                  <h2>
                    <b>Diploma Goals:</b> Things you can achieve once and know that it&apos;s done. (Like riding bike)
                  </h2>

                </div>

              </div>
        </div>
        <div className="w-[80%] max-w-xl">
              <div className="card w-full bg-slate-800  test-gray-100"> 
                
                <div className="card-body items-center">
                  
                  <h2 className="card-title  text-l sm:text-2xl">Set a goal!</h2>
                  <div className="flex justify-between w-full text-center p-4 space-x-10"> 
                    <Link href="/goalhome/toothbrushgoal">
                      <div className=" p-4 space-y-2 border border-slate-900 bg-gray-100 text-slate-900 border-solid rounded-xl shadow-xl duration-300 hover:scale-105 cursor-pointer"> 
                        <h1 className = "text-xs sm:text-xl"> Toothbrushing Goals </h1>
                        <Image src="toothbrush-svgrepo-com.svg" className="w-full object-contain" alt="Toothbrush" />
                      </div>
                    </Link>
                    <Link href="/goalhome/diplomagoal">
                      <div className=" p-4 space-y-2 border border-slate-900 bg-gray-100 text-slate-900 border-solid rounded-xl shadow-xl duration-300 hover:scale-105 cursor-pointer"> 
                        <h1 className = "text-xs sm:text-xl"> Diploma Goals </h1>
                        <Image src="diploma-svgrepo-com.svg" className="w-full object-contain rotate-270" alt="Diploma" />
                      </div>
                    </Link>
                  </div>

                </div>

              </div>
        </div>
        
          <div className="w-[80%] max-w-xl">
          <Link href="/goalhome/goaldashboard">
          <div className="card w-full bg-gray-100 text-slate-900 duration-300 hover:scale-105 cursor-pointer">
            <div className="card-body items-center text-center">
              <h2 className="card-title">View Goals!</h2>
              <p>See your progress</p>
              <div className="card-actions justify-end">
              </div>
            </div>
          </div>
          </Link>
        </div>
        
    </div>
  )
}
