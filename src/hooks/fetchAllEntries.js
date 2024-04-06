'use client'

import React, { useState, useEffect, useRef } from 'react'
import {doc, getDoc} from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { db } from '../../firebase'

export default function useFetchAllEntries() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [allEntries, setAllEntries] = useState([])
    const {currentUser} = useAuth()

    useEffect(()=>{
        async function fetchData() {
            console.log('test fetchData function')
            try {
               const docRef = doc(db, 'users', currentUser.uid) 
               const docSnap = await getDoc(docRef)
               if (docSnap.exists()){
                const keys = Object.keys(docSnap.data()).sort((a, b) => {
                    // Convert date strings back to Date objects
                    let dateA = new Date(a);
                    let dateB = new Date(b);
                  
                    // Compare the dates
                    return dateB - dateA;
                  })

                const sortedEntries = keys.map(key => {
                        return {[key]: docSnap.data()[key]}
                    })
                setAllEntries(sortedEntries)
               } else {
                setAllEntries([])
               }
            } catch (err) {
                setError('Failed to load Entry')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, )

  return (
    {loading, error, allEntries}
  )
}
