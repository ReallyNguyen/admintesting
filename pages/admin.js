'use client'
import { db } from "@/firebaseConfig"
import React, { useState, useEffect } from "react"
import { collection, getDocs } from 'firebase/firestore'

async function fetchDataFromFireStore() {
    const querySnapShot = await getDocs(collection(db, "message"))

    const data = []
    querySnapShot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
    });
    return data;
}

export default function Admin() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFireStore();
            setUserData(data)
        }
        fetchData();
    }, [])

    return (
        <main>
            <h1>fetching data</h1>
            <div>
                {userData.map((message) => (
                    <div key={message.id}>
                        <p>{message.email}</p>
                        <p>{message.name}</p>
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}
