import React from "react";
import useFormWithValidation from '../../hooks/formValidation'

function PopupWithForm({ isOpen, onClose, onSubmitSignIn, onSubmitSignUp }) {
  // Form states
  const [isSigningIn, setIsSigningIn] = React.useState(true);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
  // Validation
  const { values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  const toggleFormPurpose = () => {
    setIsSigningIn(!isSigningIn)
  }

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    if (isValid) {
      onSubmitSignIn({ 
        email: values.email, 
        password: values.password 
      });
    }
  };


  const handleSubmitRegistration = (event) => {
    event.preventDefault();
    if (isValid) {
      onSubmitSignUp({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      setIsRegistrationSuccessful(!isRegistrationSuccessful)
    }
  };

  const handleToolTipToggle = () => {
    setIsRegistrationSuccessful(!isRegistrationSuccessful)
    setIsSigningIn(true)
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <div className= {`popup-with-form ${isOpen ? 'popup-with-form_visible' : ''}`}>
      {isRegistrationSuccessful 
      ?
      <div className="popup-with-form__container">
      <button type="button" aria-label="close" className="popup-with-form__close-button" onClick={onClose}></button>
        <div className="popup-with-form-tooltip">
          <h2 className="form__title">Registration successfully completed!</h2>
        </div>
      <button className="form__switch-link form__switch-link-tooltip" onClick={handleToolTipToggle}>Sign in</button>
      </div>
      :
      <div className="popup-with-form__container">
      <button type="button" aria-label="close" className="popup-with-form__close-button" onClick={onClose}></button>
        {isSigningIn ? 
        <div className="popup-with-form-login">
          <form name="login" onSubmit={handleSubmitLogin} className="form">
            <h2 className="form__title">Sign in</h2>
            <fieldset className="form__fieldset">
              <div className="form__input-container">
                <p id="password-input-error" className="form__input-title">Email</p>
                <input 
                  id="email-input" 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={ values.email } 
                  onChange={ handleChange } 
                  className="form__input_type_email form__input" 
                  required />
                <span id="email-input-error" className="form__error">{ errors.email }</span>
              </div>
              <div className="form__input-container">
                <p id="password-input-error" className="form__input-title">Password</p>
                <input 
                  id="password-input" 
                  type="password" name="password" 
                  placeholder="Password" 
                  value={ values.password } 
                  onChange={ handleChange }
                  className="form__input_type_password form__input" 
                  required 
                  minLength="6" />
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
        :
        <div className="popup-with-form-signup">
          <form name="register" onSubmit={handleSubmitRegistration} className="form">
            <h2 className="form__title">Sign up</h2>
            <fieldset className="form__fieldset">
              <div className="form__input-container">
                <p id="password-input-error" className="form__input-title">Email</p>
                <input 
                  id="email-input" 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={ values.email } 
                  onChange={ handleChange }
                  className="form__input_type_email form__input" 
                  required />
                <span id="email-input-error" className="form__error">{ errors.email }</span>
              </div>
              <div className="form__input-container">
                <p id="password-input-error" className="form__input-title">Password</p>
                <input 
                  id="password-input" 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  value={ values.password } 
                  onChange={ handleChange }
                  className="form__input_type_password form__input" 
                  required 
                  minLength="6" />
                <span id="password-input-error" className="form__error">{ errors.password }</span>
              </div>
              <div className="form__input-container">
                <p id="username-input-error" className="form__input-title">Username</p>
                <input 
                  id="username-input" 
                  type="username" 
                  name="username" 
                  placeholder="Username" 
                  value={ values.username }
                  onChange={ handleChange } 
                  className="form__input_type_username form__input" 
                  required />
                <span id="username-input-error" className="form__error">{ errors.username }</span>
              </div>
              <button 
                type="submit" 
                aria-label="save"
                className={`form__button 
                  ${isValid ? '' : 'form__button_disabled'}`}>Sign up</button>
            </fieldset>
          </form>
        </div>}
        <p className="form__switch">or<button className="form__switch-link" onClick={toggleFormPurpose}>{isSigningIn ? 'Sign up' : 'Sign in'}</button></p>
      </div>}
    </div>
  );
}
  
export default PopupWithForm;