import { useState } from "react";
import { createAuthUserWithEmailAndPassowrd, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.style.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //confirm password matches
        if (password != confirmPassword) {
            alert("password does not match")
            return;
        }
        //then see if user is authenticate with email and password
        try {
            const { user } = await createAuthUserWithEmailAndPassowrd(email, password); // this return a respond then deconstruct into user
            //create a user doc from what createAuthUserFromEmailAndPassword return
            await createUserDocFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Cannot create user, email already in use")
            } else {
                console.log("User creation encounter an error : ", error)
            }
        }

    }
    return (
        <div className="sign-up-container">
            <h2> Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    required 
                    label='Display Name' 
                    type="text" 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}/>

                <FormInput 
                    required 
                    label='Email' 
                    type="email" 
                    onChange={handleChange} 
                    name="email" 
                    value={email}/>

                <FormInput 
                    required 
                    label='Password' 
                    type="password" 
                    onChange={handleChange} 
                    name="password" 
                    value={password}/>

                <FormInput 
                    required 
                    label='Confirm Password' 
                    type="password" 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}/>

                

                <button type="Submit"> Sign Up </button>
            </form>
        </div>
    );
}

export default SignUpForm;