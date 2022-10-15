import React from "react";

function PopupWithForm({ isOpen, onClose, children }) {


  return (
    <div className= {`popup-with-form ${isOpen ? 'popup-with-form_visible' : ''}`}>
      <div className="popup-with-form__container">
        <button type="button" aria-label="close" className="popup-with-form__close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
}
  
export default PopupWithForm;