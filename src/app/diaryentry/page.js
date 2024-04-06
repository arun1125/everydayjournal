'use client'
import { useAuth } from '@/context/AuthContext'
import useFetchEntry from '@/hooks/fetchCurrentEntry'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import Header from '@/components/Header'

export default function Diaryentry(params) {
  const searchParams = useSearchParams()
  const {userInfo, currentUser} = useAuth()
  const [grateful, setGrateful] = useState('')
  const [goal1, setGoal1] = useState('')
  const [goal2, setGoal2] = useState('')
  const [goal3, setGoal3] = useState('')
  const [day, setDay] = useState('')
  const router = useRouter()
  const currentDate = searchParams.get('date') ? searchParams.get('date') : new Date().toISOString().slice(0,10)

  const {loading, error, entry} = useFetchEntry(currentDate)

  useEffect(() => {
        if (entry) {
            console.log("I am setting the form values")
            setGrateful(entry.grateful)
            setGoal1(entry.goal1)
            setGoal2(entry.goal2)
            setGoal3(entry.goal3)
            setDay(entry.day)
        }
    }, [entry])

  const userInput = {
      grateful: grateful? grateful : '',
      goal1: goal1? goal1 : '',
      goal2: goal2? goal2 : '',
      goal3: goal3? goal3 : '',
      day: day? day : ''
  }

  async function handleSubmit(){    
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {[currentDate]: userInput}, { merge: true })
  }

  return (
    <div >
      <Header/>
        <div className="card w-full bg-inherit text-gray-100">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{currentDate}</h2>
                <p>&apos;Nature loves courage. You make the commitment and nature will respond to that commitment by removing impossible obstacles&apos;  - Terence McKenna</p>
            </div>
        </div>
        <div className="card w-full bg-inherit text-gray-100 -mt-7">
            <div className="card-body items-center text-center">
                <h2 className="card-title">Write what you are grateful for today</h2>
                {
                !entry ? <input 
                type="text" 
                placeholder="As simple as the sun or as deep the ocean" 
                className="input input-bordered input-md w-full max-w-xs  bg-gray-100 text-slate-900 text-center" 
                onChange = {(e) => setGrateful(e.target.value)}/> : 
                <input 
                type="text" 
                placeholder="As simple as the sun or as deep as you want"
                value = {grateful}
                className="input input-bordered input-md w-full max-w-xs text-slate-900 text-center bg-gray-100 " 
                onChange = {(e) => setGrateful(e.target.value)}/>
                }
            </div>
        </div>
        <div className="card w-full bg-inherit text-gray-100 -mt-7">
            <div className="card-body items-center text-center">
                <h2 className="card-title">Write down three goals you will achieve today</h2>
                {
                    !entry ?
                    <input 
                    type="text" 
                    placeholder="Goal 1: Highest Priority" 
                    className="input input-bordered input-md w-full max-w-xs text-slate-900 text-center  bg-gray-100"
                    onChange = {(e) => setGoal1(e.target.value)}
                    /> : 
                    <input 
                    type="text" 
                    placeholder="Goal 1: Highest Priority"
                    value = {goal1}
                    className="input input-bordered input-md w-full max-w-xs text-slate-900 text-center  bg-gray-100"
                    onChange = {(e) => setGoal1(e.target.value)}
                    />
                }

                {
                    !entry ?
                    <input 
                    type="text" 
                    placeholder="Goal 2: Stack those wins" 
                    className="input input-bordered input-md w-full max-w-xs text-slate-900 text-center  bg-gray-100"
                    onChange = {(e) => setGoal2(e.target.value)}
                    /> : 
                    <input 
                    type="text" 
                    placeholder="Goal 2: Stack those wins"
                    value = {goal2}
                    className="input input-bordered input-md w-full max-w-xs text-slate-900 text-center  bg-gray-100"
                    onChange = {(e) => setGoal2(e.target.value)}
                    />
                }

                {
                    !entry ?
                    <input 
                    type="text" 
                    placeholder="Goal 3: Should be easy now" 
                    className="input input-bordered input-md w-full max-w-xs text-slate-900 text-center bg-gray-100"
                    onChange = {(e) => setGoal3(e.target.value)}
                    /> : 
                    <input 
                    type="text" 
                    placeholder="Goal 3: Should be easy now"
                    value = {goal3}
                    className="input input-bordered input-md w-full max-w-xs text-slate-900 text-center bg-gray-100"
                    onChange = {(e) => setGoal3(e.target.value)}
                    />
                }
            </div>
        </div>
        <div className="card w-full bg-inherit text-gray-100 -mt-7">
            {
                !entry ?
                <div className="card-body items-center text-center">
                    <h2 className="card-title">How was your day?</h2>
                    <textarea placeholder="Write about your day, don't worry about grammer. Just go for it. Let your mind wonder on the page" 
                    className="textarea textarea-bordered textarea-md w-full  text-slate-900  bg-gray-100" 
                    onChange = {(e) => setDay(e.target.value)}></textarea>
                </div>:
                
                <div className="card-body items-center text-center">
                    <h2 className="card-title">How was your day?</h2>
                    <textarea
                    value = {day} 
                    placeholder="Write about your day, don't worry about grammer. Just go for it. Let your mind wonder on the page" 
                    className="textarea textarea-bordered textarea-md w-full  text-slate-900  bg-gray-100" 
                    onChange = {(e) => setDay(e.target.value)}></textarea>
                </div>
                
            }

        </div>
        <button className="btn btn-active w-full bg-gray-100" onClick = {()=>{
            handleSubmit()
            router.push('/dashboard')
        }}>Save your work</button>
    </div>
  )
}