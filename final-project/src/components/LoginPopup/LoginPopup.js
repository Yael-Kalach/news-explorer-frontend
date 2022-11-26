import React from "react";
import useFormWithValidation from '../../hooks/formValidation'
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const LoginPopup = ({ isOpen, onClose, toggleFormPurpose, onSubmitSignin }) => {
    const { values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValid) {
            onSubmitSignin({
                email: values.email,
                password: values.password,
            });
        }
    };

    React.useEffect(() => {
    resetForm();
    }, [isOpen]);
  
     return (
        <PopupWithForm 
        onClose={onClose} 
        isOpen={isOpen} 
        toggleFormPurpose={toggleFormPurpose} 
        handleSubmit={handleSubmit} 
        formTitle={'Sign in'} 
        toggleText={'Sign up'}
        formType={'signin'}
        isValid={isValid} >
            <div className="form__input-container">
                <p id="email-input-error" className="form__input-title">Email</p>
                <input 
                id="signin-email-input" 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={ values.email || '' } 
                onChange={ handleChange } 
                className="form__input_type_email form__input" 
                required />
                <span id="email-input-error" className="form__error">{ errors.email }</span>
            </div>
            <div className="form__input-container">
                <p id="password-input-error" className="form__input-title">Password</p>
                <input 
                id="signin-password-input" 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={ values.password || '' } 
                onChange={ handleChange }
                className="form__input_type_password form__input" 
                required 
                minLength="4" />
                <span id="password-input-error" className="form__error">{ errors.password }</span>
            </div>
        </PopupWithForm>
     )
}

export default LoginPopup;