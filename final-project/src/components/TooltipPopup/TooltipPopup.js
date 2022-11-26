import React from "react";

function TooltipPopup({ isOpen, onClose, handleToolTipToggle }) {

  return (
    <div className= {`tooltipPopup ${isOpen ? 'tooltipPopup_visible' : ''}`}>
      <div className="tooltipPopup__container">
        <button type="button" aria-label="close" className="tooltipPopup__close-button" onClick={onClose}></button>
        <div className="tooltipPopup__textContainer">
            <h2 className="tooltipPopup__textContainer_title">Registration successfully completed!</h2>
            <button className="tooltipPopup__textContainer-link" onClick={handleToolTipToggle}>Sign in</button>
        </div>
      </div>
    </div>
  );
}
  
export default TooltipPopup;