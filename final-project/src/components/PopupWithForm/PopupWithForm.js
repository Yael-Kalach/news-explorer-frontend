import React from "react";

function PopupWithForm( props ) {
  // Form states
  const [isSigningIn, setIsSigningIn] = React.useState(true);
  const [isEnabled, setIsEnabled] = React.useState(false);
  // Form values
  const initialValues = { password: '', email: '', username: '' };
  const [formValues, setFormValues] = React.useState(initialValues);
  const [formErrors, setFormErrors] = React.useState({});

  const toggleFormPurpose = () => {
    setIsSigningIn(!isSigningIn)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value});
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (!values.password) {
      errors.password = "Password is required!"
    }
    else if (values.password < 8) {
      errors.password = "Password is too short! Needs at least 8 characters."
    }
    if (!values.email) {
      errors.email = "Email is required!"
    }
    else if (!regex.test(values.email)) {
      errors.email = "This is not a valid format!"
    }
    if (!values.username) {
      errors.username = "Username is required!"
    }
    return errors;
  }

  React.useEffect(() => {
    if(Object.keys(formErrors).length === 0){
      setIsEnabled(!isEnabled)
    }
  }, [formErrors])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
  }
  // const handleSubmitSignIn = (evt) => {
  //   evt.preventDefault();
  //   setFormErrors(validate(formValues))
  //   props.handleLogin(password, email);
  // };

  // const handleSubmitSignUp = (e) => {
  //   e.preventDefault();
  //   props.handleRegister({password, email, username});
  //   setIsSigningIn(true)
  // }  

    return (
      <div className= {`popup-with-form ${props.isOpen ? 'popup-with-form_visible' : ''}`}>
        <div className="popup-with-form__container">
        <button type="button" aria-label="close" className="popup-with-form__close-button" onClick={props.onClose}></button>
          {isSigningIn ? 
          <div className="popup-with-form-login">
            <form name="login" onSubmit={handleSubmit} className="form">
              <h2 className="form__title">Sign in</h2>
              <fieldset className="form__fieldset">
                <div className="form__input-container">
                  <p id="password-input-error" className="form__input-title">Email</p>
                  <input 
                    id="email-input" 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={ formValues.email } 
                    onChange={ handleChange } 
                    className="form__input_type_email form__input" 
                    required />
                  <span id="email-input-error" className="form__error">{ formErrors.email }</span>
                </div>
                <div className="form__input-container">
                  <p id="password-input-error" className="form__input-title">Password</p>
                  <input 
                    id="password-input" 
                    type="password" name="password" 
                    placeholder="Password" 
                    value={ formValues.password } 
                    onChange={ handleChange }
                    className="form__input_type_password form__input" 
                    required 
                    minLength="8" />
                  <span id="password-input-error" className="form__error">{ formErrors.password }</span>
                </div>
                <button 
                  type="submit" 
                  aria-label="save"
                  className={`form__button 
                    ${isEnabled  ? '' : 'form__button_disabled'}`}>Sign in</button>
              </fieldset>
            </form>
          </div>
          :
          <div className="popup-with-form-signup">
            <form name="register" onSubmit={handleSubmit} className="form">
              <h2 className="form__title">Sign up</h2>
              <fieldset className="form__fieldset">
                <div className="form__input-container">
                  <p id="password-input-error" className="form__input-title">Email</p>
                  <input 
                    id="email-input" 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={ formValues.email } 
                    onChange={ handleChange }
                    className="form__input_type_email form__input" 
                    required />
                  <span id="email-input-error" className="form__error">{ formErrors.email }</span>
                </div>
                <div className="form__input-container">
                  <p id="password-input-error" className="form__input-title">Password</p>
                  <input 
                    id="password-input" 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={ formValues.password } 
                    onChange={ handleChange }
                    className="form__input_type_password form__input" 
                    required 
                    minLength="8" />
                  <span id="password-input-error" className="form__error">{ formErrors.password }</span>
                </div>
                <div className="form__input-container">
                  <p id="username-input-error" className="form__input-title">Username</p>
                  <input 
                    id="username-input" 
                    type="username" 
                    name="username" 
                    placeholder="Username" 
                    value={ formValues.username }
                    onChange={ handleChange } 
                    className="form__input_type_username form__input" 
                    required />
                  <span id="username-input-error" className="form__error">{ formErrors.username }</span>
                </div>
                <button 
                  type="submit" 
                  aria-label="save"
                  className={`form__button 
                    ${isEnabled ? '' : 'form__button_disabled'}`}>Sign up</button>
              </fieldset>
            </form>
          </div>}
          <p className="form__switch">or<button className="form__switch-link" onClick={toggleFormPurpose}>{isSigningIn ? 'Sign up' : 'Sign in'}</button></p>
        </div>
      </div>
    );
  }
  
  export default PopupWithForm;