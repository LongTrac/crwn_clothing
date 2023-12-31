import { useState } from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocFromAuth,
}
    from "../../utils/firebase/firebase.utils.js";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer, H2 } from './sign-up-form.style.jsx'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //confirm password matches
        if (password !== confirmPassword) {
            alert("password does not match");
            return;
        }
        //then see if user is authenticate with email and password
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password, displayName); // this return a respond then deconstruct into user

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
        <SignUpContainer>
            <H2> Don't have an account</H2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    required
                    label='Display Name'
                    type="text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />

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

                <FormInput
                    required
                    label='Confirm Password'
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} />



                <Button type="Submit"> Sign Up </Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;