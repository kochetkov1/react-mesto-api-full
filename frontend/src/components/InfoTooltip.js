import React from "react";
import okIcon from "../images/ok-icon.svg";
import errorIcon from "../images/error-icon.svg";

function InfoTooltip(props) {
  const { isOpen, onClose, popupMessage, okStatus } = props;

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img
          className="popup__icon"
          src={`${okStatus ? okIcon : errorIcon}`}
          alt="Значок состояния"
        />
        <h2 className="popup__title popup__title_info-tool">{popupMessage}</h2>
        <button
          className="popup__close-button"
          type="button"
          name="popup__close-button-profile"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
