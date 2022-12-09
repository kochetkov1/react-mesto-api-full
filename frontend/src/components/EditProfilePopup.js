import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"profile"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            className="popup__input popup__input-name"
            id="name-input"
            name="name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleChangeName}
          />
          <span className="name-input-error popup__input-error"></span>
          <input
            type="text"
            className="popup__input popup__input-description"
            id="description-input"
            name="description"
            placeholder="Описание профиля"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleChangeDescription}
          />
          <span className="description-input-error popup__input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
