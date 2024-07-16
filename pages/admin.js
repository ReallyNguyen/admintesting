'use client'
import { db } from "@/firebaseConfig";
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from 'firebase/firestore';

async function addDataToApprovedCollection(item) {
    try {
        const docRef = await addDoc(collection(db, "approved"), item);
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding document to approved collection: ", error);
        return false;
    }
}

async function fetchDataFromFireStore() {
    const querySnapShot = await getDocs(collection(db, "message"));
    const data = [];
    querySnapShot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function Admin() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFireStore();
            setUserData(data);
        }
        fetchData();
    }, []);

    const handleApprove = async (item) => {
        const added = await addDataToApprovedCollection(item);
        if (added) {
            alert("Data added to approved Firestore collection");
        }
    };

    return (
        <main>
            <h1>Admin Page</h1>
            <h2>Fetched Data</h2>
            <div>
                {userData.map((message) => (
                    <div key={message.id}>
                        <p>Email: {message.email}</p>
                        <p>Name: {message.name}</p>
                        <p>Message: {message.message}</p>
                        <button onClick={() => handleApprove(message)}>Approve</button>
                    </div>
                ))}
            </div>
        </main>
    );
}
