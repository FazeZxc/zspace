import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const LoginForm = () => {
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
            })
            .catch((error) => {
                const { message } = error
                setFirebaseErrorResponse(message)
            })
    }
    return (
        <>
            <form onSubmit={formSubmit}>
                <input
                    id="emailInput"
                    type="text"
                    placeholder="email"
                    value={userInput.email}
                    onChange={handleChange}
                ></input>
                <input
                    id="passwordInput"
                    type="password"
                    placeholder="password"
                    value={userInput.password}
                    onChange={handleChange}
                ></input>
                <div>{firebaseErrorResponse.slice(10).slice(0, -1)}</div>
                <button  className="bg-red-400 w-[200px] border-2">Login</button>
            </form>
        </>
    )
}
