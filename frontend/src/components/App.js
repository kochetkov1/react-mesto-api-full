import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Api from '../utils/Api';
import { options } from '../utils/authApi.js';
import avatarImg from '../images/profile-photo.jpg';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { register, authorization, getContent } from '../utils/authApi';

function App() {
  const jwt = localStorage.getItem('jwt');
  const api = new Api(options, jwt);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isStatusPopupOpen, setIsStatusPopupOpen] = React.useState(false);
  const [isPopupMessage, setIsPopupMessage] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Дмитрий',
    about: 'Разработчик',
    avatar: avatarImg,
  });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registeredIn, setRegisteredIn] = React.useState(false);
  const [UserEmail, setUserEmail] = React.useState('');
  const navigate = useNavigate();

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsStatusPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleUpdateUser(data) {
    api
      .setUserProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка при обновлении данных пользователя:', err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Регистрация в приложении
  function handleOnRegister(email, password) {
    register(email, password)
      .then((res) => {
        if (res.data) {
          setRegisteredIn(true);
          setIsPopupMessage('Вы успешно зарегистрировались!');
        }
        navigate('/sign-in');
      })
      .catch((err) => {
        setRegisteredIn(false);
        setIsPopupMessage('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err);
      })
      .finally(() => {
        setIsStatusPopupOpen(!isStatusPopupOpen);
      });
  }

  // Вход в приложение
  function handleOnLogin(email, password) {
    authorization(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setUserEmail(email);
          localStorage.setItem('jwt', res.token);
        }
        navigate('/');
      })
      .catch((err) => {
        setRegisteredIn(false);
        setIsPopupMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setIsStatusPopupOpen(!isStatusPopupOpen);
        console.log('Ошибка при входе в приложение:', err);
      });
  }

  // Выход из приложения
  function handleSignOut() {
    // Удаление токена
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    // Переадресация на страницу входа
    navigate('/sign-in');
  }

  function tokenCheck() {
    if (jwt !== null && jwt !== 'undefined') {
      getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate('/');
        })
        .catch((err) => {
          console.log('Ошибка токена:', err);
        });
    }
  }

  // Загрузка данных профиля и карточек после входа
  React.useEffect(() => {
    if (jwt) {
      Promise.all([api.getUserProfile(), api.getInitialCards()])
        .then(([data, initialCards]) => {
          setCurrentUser(data);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    tokenCheck();
  }, [jwt]);

  React.useEffect(() => {
    if (loggedIn) {
      setRegisteredIn(false);
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <div className='page'>
          <Header email={UserEmail} onSignOut={handleSignOut} />

          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path='/sign-up'
              element={<Register onRegister={handleOnRegister} />}
            />

            <Route
              path='/sign-in'
              element={<Login onLogin={handleOnLogin} />}
            />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isStatusPopupOpen}
            onClose={closeAllPopups}
            popupMessage={isPopupMessage}
            okStatus={registeredIn}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
