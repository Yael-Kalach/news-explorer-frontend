import React from "react";

function PopupWithForm( props ) {
  const [isSigningIn, setIsSigningIn] = React.useState(true);
  const [isEnabled, setIsEnabled] = React.useState(true);

  const toggleFormPurpose = () => {
    setIsSigningIn(!isSigningIn)
  }

  const enableButton = (e) => {
    e.preventdefault();
    setIsEnabled(!isEnabled)
  }

    return (
      <div className= {`popup-with-form ${props.isOpen ? 'popup-with-form_visible' : ''}`}>
        <div className="popup-with-form__container">
        <button type="button" aria-label="close" className="popup-with-form__close-button" onClick={props.onClose}></button>
          {isSigningIn ? 
          <div className="popup-with-form-login">
            <form name="login" className="form">
              <h2 className="form__title">Sign in</h2>
              <fieldset className="form__fieldset">
                <div className="form__input-container">
                  <p id="password-input-error" className="form__input-title">Email</p>
                  <input id="email-input" type="email" name="email" placeholder="Email" className="form__input_type_email form__input" required />
                  <span id="email-input-error" className="form__error"></span>
                </div>
                <div className="form__input-container">
                  <p id="password-input-error" className="form__input-title">Password</p>
                  <input id="password-input" type="password" name="password" placeholder="Password" className="form__input_type_password form__input" required minLength="8" />
                  <span id="password-input-error" className="form__error"></span>
                </div>
                <button type="submit" aria-label="save" onSubmit={enableButton} className={`form__button ${isEnabled ? '' : 'form__button_disabled'}`}>Sign in</button>
              </fieldset>
            </form>
          </div>
          :
          <div className="popup-with-form-signup">
            <form name="login" className="form">
              <h2 className="form__title">Sign up</h2>
              <fieldset className="form__fieldset">
                <div className="form__input-container">
                  <p id="password-input-error" className="form__input-title">Email</p>
                  <input id="email-input" type="email" name="email" placeholder="Email" className="form__input_type_email form__input" required />
                  <span id="email-input-error" className="form__error"></span>
                </div>
                <div className="form__input-container">
                  <p id="password-input-error" className="form__input-title">Password</p>
                  <input id="password-input" type="password" name="password" placeholder="Password" className="form__input_type_password form__input" required minLength="8" />
                  <span id="password-input-error" className="form__error"></span>
                </div>
                <div className="form__input-container">
                  <p id="username-input-error" className="form__input-title">Username</p>
                  <input id="username-input" type="username" name="username" placeholder="Username" className="form__input_type_username form__input" required minLength="8" />
                  <span id="username-input-error" className="form__error"></span>
                </div>
                <button type="submit" aria-label="save" onSubmit={enableButton} className={`form__button ${isEnabled ? '' : 'form__button_disabled'}`}>Sign up</button>
              </fieldset>
            </form>
          </div>}
          <p className="form__switch">or<button className="form__switch-link" onClick={toggleFormPurpose}>{isSigningIn ? 'Sign up' : 'Sign in'}</button></p>
        </div>
      </div>
    );
  }
  
  export default PopupWithForm;