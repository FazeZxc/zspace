import { useEffect, useState } from 'react'
import { LoginForm } from './components/LoginForm'
// import { SignUpForm } from './components/SignUpForm'
import { Scribble } from './pages/scribble'
import { getAuth } from 'firebase/auth'

const App = () => {
    const auth = getAuth()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    useEffect(() => {
        if (auth.currentUser) {
            setIsUserLoggedIn(true)
        } else {
            setIsUserLoggedIn(false)
        }
    }, [auth, isUserLoggedIn])
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
