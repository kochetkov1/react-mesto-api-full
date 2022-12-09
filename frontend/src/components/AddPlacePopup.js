import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;

  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  // Обработчик изменения инпута обновляет стейт
  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: title,
      link: link,
    });
  }

  React.useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"card"}
      buttonText={"Cоздать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            className="popup__input popup__input-name"
            id="name-card-input"
            name="name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            value={title}
            onChange={handleChangeTitle}
          />
          <span className="name-card-input-error popup__input-error"></span>
          <input
            type="url"
            className="popup__input popup__input-description"
            id="url-card-input"
            name="link"
            placeholder="Ссылка"
            required
            value={link}
            onChange={handleChangeLink}
          />
          <span className="url-card-input-error popup__input-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
