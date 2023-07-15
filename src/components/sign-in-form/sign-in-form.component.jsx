import Button from "../button/button.component";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import {
    createUserDocFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import './sign-in-form.style.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();

        } catch (error) {

            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password for the email");
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email");
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        try {
            const response = await signInWithGooglePopup();
            const { user } = response;
            await createUserDocFromAuth(user);
        }catch (error){
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    alert("pop-up closed by user");
                    break;

                default:
                    console.log(error);
            }
        }
        
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    required
                    label='Email'
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    required
                    label='Password'
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password} />

                <div className="buttons-container">
                    <Button type="Submit">SIGN IN</Button>
                    <Button type="button" buttonType={'google'} onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
            </form>



        </div>

    );
}

export default SignInForm