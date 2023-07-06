import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
const SignIn = () =>{
    const logGoogleUser = async () =>{
        const response = await signInWithGooglePopup();
        const {user} = response;
        const userDocRef = await createUserDocFromAuth(user);
    };
    return (
        <div>
            <h1>

                Sign In
            </h1>

            <button onClick={logGoogleUser}>Sign in with google pop up</button>
        </div>
    );
}

export default SignIn;