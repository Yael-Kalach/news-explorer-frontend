import React from "react";
import useFormWithValidation from '../../hooks/formValidation'
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const RegistrationPopup = ({ isOpen, onClose, toggleFormPurpose, onSubmitSignUp }) => {
    const { values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValid) {
            onSubmitSignUp({
                email: values.email,
                password: values.password,
                name: values.name,
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
        formTitle={'Sign up'} 
        toggleText={'Sign in'}
        formType={'signup'}
        isValid={isValid} >
            <div className="form__input-container">
                <p id="email-input-title" className="form__input-title">Email</p>
                <input 
                id="signup-email-input" 
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
                <p id="password-input-title" className="form__input-title">Password</p>
                <input 
                id="signup-password-input" 
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
            <div className="form__input-container">
                <p id="username-input-title" className="form__input-title">Username</p>
                <input 
                id="signup-name-input" 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={ values.name || '' }
                onChange={ handleChange } 
                className="form__input_type_username form__input" 
                required
                minLength="2"
                maxLength="30" />
                <span id="username-input-error" className="form__error">{ errors.name }</span>
            </div>

        </PopupWithForm>
     )
}

export default RegistrationPopup;