import React from "react";

function PopupWithForm({ 
  isOpen, 
  onClose, 
  children, 
  toggleFormPurpose, 
  formTitle, 
  toggleText, 
  handleSubmit, 
  formType,
  isValid
 }) {
  
  return (
    <div className= {`popup-with-form ${isOpen ? 'popup-with-form_visible' : ''}`}>
      <div className="popup-with-form__container">
        <button type="button" aria-label="close" className="popup-with-form__close-button" onClick={onClose}></button>
        <div className={`popup-with-form-${formType}`}>
            <form name="register" onSubmit={handleSubmit} className="form">
                <h2 className="form__title">{formTitle}</h2>
                <fieldset className="form__fieldset">
                  {children}
                  <button type="submit" aria-label="save" className={`form__button ${isValid  ? '' : 'form__button_disabled'}`}>{formTitle}</button>
                </fieldset>
            </form>
            </div>
            <p className="form__switch">or<button className="form__switch-link" onClick={toggleFormPurpose}>{toggleText}</button></p>
      </div>
    </div>
  );
}
  
export default PopupWithForm;