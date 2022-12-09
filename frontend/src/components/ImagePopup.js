function ImagePopup(props) {
  const { onClose, card } = props;

  return (
    <div
      className={`popup popup-pic popup_type_img ${
        card.link ? "popup_opened" : ""
      }`}
      id="popup-pic"
    >
      <div className="popup-pic__container">
        <img className="popup-pic__image" src={card.link} alt={card.name} />
        <p className="popup-pic__title">{card.name}</p>
        <button
          className="popup-pic__close-button popup__close-button"
          type="button"
          name="popup__close-button-image"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
