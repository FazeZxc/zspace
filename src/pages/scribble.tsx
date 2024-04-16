import { useEffect, useState } from 'react'
import { collection, getDoc, setDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import db from '../firebase'
import { getAuth } from 'firebase/auth'

const citiesRef = collection(db, 'scribble')
const docRef = doc(db, 'scribble', 'A')
const docSnap = await getDoc(docRef)
export const Scribble = () => {
    const auth = getAuth()
    const [userInput, setUserInput] = useState('')
    function handleChange(event: { target: { value: string } }) {
        setUserInput(event.target.value)
    }

    async function fetchScribble() {
        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data())
            setUserInput(docSnap.data().message)
        } else {
            console.log('No such document!')
        }
    }

    async function addScribble(event: React.SyntheticEvent) {
        if (auth.currentUser) {
            event.preventDefault()
            await setDoc(doc(citiesRef, 'A'), {
                Author: 'admin',
                message: userInput,
            })
        } else {
            prompt('not admin')
        }
    }
    useEffect(() => {
        fetchScribble()
    }, [])

    return (
        <div className="w-1/2 flex flex-col">
            <textarea
                value={userInput}
                onChange={handleChange}
                className=" h-screen text-left bg-[#272727] text-white text-2xl"
            ></textarea>
            <button className="bg-lime-400 w-[200px] border-2" onClick={addScribble}>
                Add
            </button>
        </div>
    )
}
