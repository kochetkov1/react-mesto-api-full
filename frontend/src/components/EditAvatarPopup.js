import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const avatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="url"
            className="popup__input popup__input-avatar"
            id="url-avatar-input"
            name="link"
            placeholder="Ссылка"
            required
            ref={avatarRef}
          />
          <span className="url-avatar-input-error popup__input-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
