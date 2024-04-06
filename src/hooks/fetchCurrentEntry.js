'use client'

import React, { useState, useEffect, useRef } from 'react'
import {doc, getDoc} from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { db } from '../../firebase'

export default function useFetchEntry(currentDate) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [entry, setEntry] = useState(null)
    const {currentUser} = useAuth()

    useEffect(()=>{
        async function fetchData() {
            try {
               const docRef = doc(db, 'users', currentUser.uid) 
               const docSnap = await getDoc(docRef)
               if (docSnap.exists()){
                    setEntry(docSnap.data()[currentDate])
               } else {
                setEntry({})
               }
            } catch (err) {
                setError('Failed to load Entry')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

  return (
    {loading, error, entry}
  )
}
