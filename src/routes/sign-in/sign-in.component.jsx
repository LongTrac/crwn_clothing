import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocFromAuth
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {

    //example of how to use sign in with Redirect
    useEffect(() => {
        const getUserResultAfterRedirect = async () => {
            const response = await getRedirectResult(auth);
            console.log(response);

            if(response){
                const userDocRef = await createUserDocFromAuth(response.user)
            }
        }
        getUserResultAfterRedirect();
    }, [])

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const { user } = response;
        const userDocRef = await createUserDocFromAuth(user);
    };

    return (
        <div>
            <h1>

                Sign In
            </h1>

            <button onClick={logGoogleUser}>Sign in with google pop up</button>

            {/* any code that happen aftrer the redirect will not happen since it is redirecting 
                our entire page so the page got unmounted 
                to be able to see result after redirect we must use UseEffect and getRedirectResult */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with google redirect</button> */}

            <SignUpForm/>
        </div>
    );
}

export default SignIn;