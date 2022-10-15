import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function TooltipPopup({ isOpen, onClose, handleToolTipToggle }) {

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
       <div className="popup-with-form-tooltip">
            <h2 className="form__title">Registration successfully completed!</h2>
            <button className="form__switch-link form__switch-link-tooltip" onClick={handleToolTipToggle}>Sign in</button>
        </div>
    </PopupWithForm>
  );
}
  
export default TooltipPopup;