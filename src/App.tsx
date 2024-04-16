import { useEffect, useState } from 'react'
import { LoginForm } from './components/LoginForm'
// import { SignUpForm } from './components/SignUpForm'
import { Scribble } from './pages/scribble'
import {
    getAuth,
    onAuthStateChanged,
    inMemoryPersistence,
    setPersistence,
} from 'firebase/auth'

const App = () => {
    const auth = getAuth()
    setPersistence(auth, inMemoryPersistence)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsUserLoggedIn(true)
            } else {
                setIsUserLoggedIn(false)
            }
        })
    }, [auth])
    return (
        <div className="flex flex-row justify-center h-screen w-screen bg-slate-700 gap-[200px]">
            {isUserLoggedIn ? (
                <p className="text-white">Admin Mode</p>
            ) : (
                <LoginForm setIsUserLoggedIn={setIsUserLoggedIn} />
            )}
            <Scribble />
        </div>
    )
}

export default App
