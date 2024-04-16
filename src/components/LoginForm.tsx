import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

interface propsType {
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void
}

export const LoginForm = (props: propsType) => {
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    })
    const [firebaseErrorResponse, setFirebaseErrorResponse] = useState('')
    function handleChange(event: { target: { id: string; value: string } }) {
        const input = {
            emailInput: '',
            passwordInput: '',
        }
        if (event.target.id == 'emailInput') {
            input.emailInput = event.target.value
            setUserInput((prev) => ({
                ...prev,
                email: input.emailInput,
            }))
        } else if (event.target.id == 'passwordInput') {
            input.passwordInput = event.target.value
            setUserInput((prev) => ({
                ...prev,
                password: input.passwordInput,
            }))
        }
        console.log(userInput)
    }
    async function formSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        const auth = getAuth()
        await signInWithEmailAndPassword(
            auth,
            userInput.email,
            userInput.password
        )
            .then((userCredentials) => {
                const { user } = userCredentials
                console.log(user)
                props.setIsUserLoggedIn(true)
            })
            .catch((error) => {
                const { message } = error
                setFirebaseErrorResponse(message)
            })
    }
    return (
        <div className="flex flex-col gap-20 mt-[100px] w-[300px]">
            <h1 className="text-4xl font-semibold text-white text-center underline">
                Login to Edit
            </h1>
            <form
                onSubmit={formSubmit}
                className="flex flex-col w-[300px] h-[350px] gap-[20px] resize-none items-center justify-center bg-slate-500 rounded-[40px]"
            >
                <input
                    id="emailInput"
                    type="text"
                    placeholder="email"
                    value={userInput.email}
                    onChange={handleChange}
                    className="w-11/12 rounded-sm p-2"
                ></input>
                <input
                    id="passwordInput"
                    type="password"
                    placeholder="password"
                    value={userInput.password}
                    onChange={handleChange}
                    className="w-11/12 rounded-sm p-2"
                ></input>
                <div>{firebaseErrorResponse.slice(10).slice(0, -1)}</div>
                <button className="bg-red-400 w-[200px] border-2 rounded-lg p-2  text-white font-semibold text-2xl">
                    Login
                </button>
            </form>
        </div>
    )
}
