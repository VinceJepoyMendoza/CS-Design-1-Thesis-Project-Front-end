import axios from 'axios';
import { userActions } from '../reducers/userSlice';
import { generalActions } from '../reducers/generalSlice';

const urlOrigin = 'http://localhost:5000';
const token = localStorage.getItem('SPGBMToken');

// popup message template
const showPoppup = (type, message) =>
  generalActions.setPopupMessage({ show: true, type: type, message: message });

const authAxios = axios.create({
  baseURL: urlOrigin,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

// Loading state
const { setIsLoading } = generalActions;

// Login account
export const attemptLogin = (candidate) => async (dispatch) => {
  // Loading start
  dispatch(setIsLoading(true));

  await axios
    .post(`${urlOrigin}/auth/login`, candidate)
    .then((resp) => {
      // email and password matched
      // save token to localstorage
      localStorage.setItem('SPGBMToken', resp.data.token);

      // Redirect to dashboard
      window.open('/welcome', '_self');

      // Stop loading
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      // Clear token in local storage
      localStorage.setItem('SPGBMToken', '');

      // Stop loading
      dispatch(setIsLoading(false));

      // Show alert message
      dispatch(showPoppup('danger', err.response.data.message));
    });
};

// Fetch current user's info
export const fetchUserInfo = () => async (dispatch) => {
  // Start loading
  dispatch(setIsLoading(true));

  authAxios
    .get(`${urlOrigin}/user/current-user`)
    .then((resp) => {
      // Stop loading
      dispatch(setIsLoading(false));

      // Set current user's info
      dispatch(userActions.setUserInfo(resp.data.user));
    })
    .catch((err) => {
      // Stop loading
      dispatch(setIsLoading(false));
    });
};

// Register new User
export const registerNewUser = (register, clearInputs) => async (dispatch) => {
  // Start loading
  dispatch(setIsLoading(true));

  await axios
    .post(`${urlOrigin}/auth/register`, register)
    .then((resp) => {
      // Stop loading
      dispatch(setIsLoading(false));

      // Clear inputs
      clearInputs();

      // show success message
      dispatch(showPoppup('success', resp.data.message));
    })
    .catch((err) => {
      // More than 1 input error
      const inputs = err.response.data.inputs;

      // show error message
      !inputs
        ? dispatch(showPoppup('danger', err.response.data.message))
        : dispatch(showPoppup('danger', err.response.data));

      // Stop loading
      dispatch(setIsLoading(false));
    });
};
