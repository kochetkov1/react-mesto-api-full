function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""} popup_type_${
        props.name
      }`}
      id="popup-profile"
    >
      <div className="popup__container">
        <h2 className="popup__title">{`${props.title}`}</h2>
        <form
          className="popup__form"
          name={`popup__form-${props.name}`}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            className="popup__save-button"
            onClick={props.onSubmit}
          >
            {props.buttonText}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          name="popup__close-button-profile"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
