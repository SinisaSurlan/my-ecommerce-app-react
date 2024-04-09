import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss"

const defaultFormFields = {
    displayName : "",
    email : "",
    password : "",
    confirmPassword : ""    
}

const SignUpForm = () => {

    const[formFields, setFormFields] = useState(defaultFormFields);
    const{displayName,email,password,confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
            
        } catch (error) {
            if(error.code == 'auth/email-already-in-use'){
                alert("you cannot create an user email in use");
            }
            console.log("user creation encounter an error" ,error);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    return (
        <div className="sign-up-container">
          <h2>Do not have an account?</h2>
          <span>Sign up with your email and password</span>
          <form onSubmit={handleSubmit}>
            <FormInput label="Display name" type="text" autoComplete="name" required onChange={handleChange} name="displayName" value={displayName} />
      
            <FormInput label="Email" type="email" autoComplete="email" required onChange={handleChange} name="email" value={email} />
      
            <FormInput label="Password" type="password" autoComplete="new-password" required onChange={handleChange} name="password" value={password} />
      
            <FormInput label="Confirm password" type="password" autoComplete="new-password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
      
            <Button type="submit">Sign up</Button>
          </form>
        </div>
      );
}

export default SignUpForm;