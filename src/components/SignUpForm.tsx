import { useState } from 'react'
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'

const errors = {
    passMatchError: { message: 'Passwords didnt match !' },
    emptyfieldError: { message: 'Fields can not be empty !' },
}

export const SignUpForm = () => {
    // const [cookies, setCookie, removeCookie] = (['cookie-name']);
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [isPasswordMatched, setIsPasswordMatched] = useState('none')
    const [isFieldEmpty, setIsFieldEmpty] = useState('none')
    const [firebaseErrorResponse, setFirebaseErrorResponse] = useState('')
    function handleUserInput(event: { target: { id: string; value: string } }) {
        const { id, value } = event.target
        const input = {
            nameInput: '',
            emailInput: '',
            passwordInput: '',
            confirmPasswordInput: '',
        }
        if (id == 'name') {
            input.nameInput = value
            setUserInput((prev) => ({
                ...prev,
                name: input.nameInput,
            }))
        } else if (id == 'email') {
            input.emailInput = value
            setUserInput((prev) => ({
                ...prev,
                email: input.emailInput,
            }))
        } else if (id == 'password') {
            input.passwordInput = value
            setUserInput((prev) => ({
                ...prev,
                password: input.passwordInput,
            }))
        } else if (id == 'confirmPassword') {
            input.confirmPasswordInput = value
            setUserInput((prev) => ({
                ...prev,
                confirmPassword: input.confirmPasswordInput,
            }))
        }
    }
    function submitSignUp(event: React.SyntheticEvent) {
        event.preventDefault()
        console.log(userInput)

        if (
            userInput.confirmPassword == '' ||
            userInput.password == '' ||
            userInput.email == '' ||
            userInput.name == ''
        ) {
            setIsFieldEmpty('flex')
        } else {
            setIsPasswordMatched('none')
            if (userInput.password != userInput.confirmPassword) {
                setIsPasswordMatched('flex')
            } else {
                setIsPasswordMatched('none')
                const auth = getAuth()
                createUserWithEmailAndPassword(
                    auth,
                    userInput.email,
                    userInput.password
                )
                    .then((userCredential) => {
                        const { user } = userCredential
                        if (auth.currentUser) {
                            updateProfile(auth.currentUser, {
                                displayName: userInput.name,
                            })
                        }
                        console.log(user)
                    })
                    .catch((error) => {
                        const { message } = error
                        setFirebaseErrorResponse(message)
                        console.log(message)
                    })
            }
        }
    }
    return (
        <>
            <form onSubmit={submitSignUp}>
                <input
                    id="name"
                    type="text"
                    placeholder="name"
                    value={userInput.name}
                    onChange={handleUserInput}
                ></input>
                <input
                    id="email"
                    type="email"
                    placeholder="email"
                    value={userInput.email}
                    onChange={handleUserInput}
                ></input>
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={userInput.password}
                    onChange={handleUserInput}
                ></input>
                <input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="password"
                    value={userInput.confirmPassword}
                    onChange={handleUserInput}
                ></input>
                <div style={{ display: `${isPasswordMatched}` }}>
                    {errors.passMatchError.message}
                </div>
                <div style={{ display: `${isFieldEmpty}` }}>
                    {errors.emptyfieldError.message}
                </div>
                <div>{firebaseErrorResponse.slice(10).slice(0, -1)}</div>
                <button>Sign Up</button>
            </form>
        </>
    )
}
