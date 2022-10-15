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
        <PopupWithForm isOpen={isOpen} onClose={onClose}>
            <div className="popup-with-form-login">
                <form name="login" onSubmit={handleSubmit} className="form">
                    <h2 className="form__title">Sign in</h2>
                    <fieldset className="form__fieldset">
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
                    <button 
                        type="submit" 
                        aria-label="save"
                        className={`form__button 
                        ${isValid  ? '' : 'form__button_disabled'}`}>Sign in</button>
                    </fieldset>
                </form>
            </div>
            <p className="form__switch">or<button className="form__switch-link" onClick={toggleFormPurpose}>Sign up</button></p>
        </PopupWithForm>
     )
}

export default LoginPopup;