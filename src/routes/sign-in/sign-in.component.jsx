import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Sing in wiht google popup</button>
            <SignUpForm />
        </>
    )
}

export default SignIn