// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
// import {
//     auth,
//     signInWithGooglePopup,
//     signInWithGoogleRedirect,
//     createUserDocFromAuth
// } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { AuthenticationContainer } from "./authentication.style.jsx"

const Authentication = () => {

    //example of how to use sign in with Redirect
    // useEffect(() => {
    //     const getUserResultAfterRedirect = async () => {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);

    //         if(response){
    //             const userDocRef = await createUserDocFromAuth(response.user)
    //         }
    //     }
    //     getUserResultAfterRedirect();
    // }, [])



    return (
        <AuthenticationContainer>
            <SignInForm />
            {/* any code that happen aftrer the redirect will not happen since it is redirecting 
                our entire page so the page got unmounted 
                to be able to see result after redirect we must use UseEffect and getRedirectResult */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with google redirect</button> */}

            <SignUpForm />
        </AuthenticationContainer>
    );
}

export default Authentication;