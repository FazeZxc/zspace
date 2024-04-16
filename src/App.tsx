import { LoginForm } from './components/LoginForm'
// import { SignUpForm } from './components/SignUpForm'
import { Scribble } from './pages/scribble'

const App = () => {
    return (
        <div className='flex flex-row-reverse h-screen w-screen'>
            {/* <SignUpForm /> */}
            <LoginForm />
            <Scribble />
        </div>
    )
}

export default App
