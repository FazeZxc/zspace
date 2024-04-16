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
        <div className="w-1/2 h-3/4  flex flex-col resize-none mt-[100px] bg-slate-500 rounded-[40px]">
            <textarea
                value={userInput}
                onChange={handleChange}
                className="h-full p-4 pb-2 text-left bg-[#272727] text-white text-xl resize-none rounded-[24px] m-4"
            ></textarea>
            <div className="flex flex-row justify-between items-center p-4 pt-2">
                <button
                    className="bg-lime-400 w-[200px] border-2 rounded-lg p-2 text-white font-semibold text-2xl"
                    onClick={addScribble}
                >
                    Add
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(userInput)
                        alert('copied to clipboard')
                    }}
                    className="bg-blue-400 w-[200px] border-2 rounded-lg p-2 text-white font-semibold text-2xl mb-4"
                >
                    Copy
                </button>
            </div>
        </div>
    )
}
