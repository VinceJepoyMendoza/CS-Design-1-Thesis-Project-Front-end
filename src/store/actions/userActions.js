import axios from 'axios';
import { userActions } from '../reducers/userSlice';
import { generalActions } from '../reducers/generalSlice';

export const urlOrigin = 'http://localhost:5000';
const token = localStorage.getItem('SPGBMToken');

// popup message template
export const showPoppup = (type, message) =>
  generalActions.setPopupMessage({ show: true, type: type, message: message });

export const authAxios = axios.create({
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

      // Show alert message
      dispatch(showPoppup('danger', err.response.data.message));

      // Stop loading
      dispatch(setIsLoading(false));
    });
};

// Fetch current user's info
export const fetchUserInfo = () => async (dispatch) => {
  // Start loading
  dispatch(setIsLoading(true));

  authAxios
    .get(`${urlOrigin}/user/current-user`)
    .then((resp) => {
      // Set current user's info
      dispatch(userActions.setUserInfo(resp.data.user));

      // Stop loading
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      // Removed token if expired
      localStorage.setItem('SPGBMToken', '');

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
      // Clear inputs
      clearInputs();

      // show success message
      dispatch(showPoppup('success', resp.data.message));

      // Stop loading
      dispatch(setIsLoading(false));
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

// Update user
export const updateUserInfo =
  (id, infos, setIsEditing, setconfirmPassword) => (dispatch) => {
    // Start loading
    dispatch(setIsLoading(true));

    authAxios
      .patch(`${urlOrigin}/user/${id}`, infos)
      .then((resp) => {
        // Stop editing
        setIsEditing(false);

        // Clear confirm password field
        setconfirmPassword('');

        dispatch(showPoppup('success', resp.data.message));

        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        // More than 1 input error
        const inputs = err.response.data.inputs;

        // show error message
        !inputs
          ? dispatch(showPoppup('danger', err.response.data.message))
          : dispatch(showPoppup('danger', err.response.data));

        dispatch(setIsLoading(false));
      });
  };

// Delete user/account
export const deleteUser = (id, confirmPassword) => (dispatch) => {
  // Start Loading
  dispatch(setIsLoading(true));

  authAxios
    .delete(`${urlOrigin}/user/${id}`, { data: { confirmPassword } })
    .then((resp) => {
      dispatch(showPoppup('success', resp.data.message));

      window.location.reload();

      // Stop Loading
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      dispatch(showPoppup('danger', err.response.data.message));

      // Stop Loading
      dispatch(setIsLoading(false));
    });
};

// fetch all users - for admins only
export const fetchUsers = () => async (dispatch) => {
  // Start loading
  dispatch(setIsLoading(true));

  authAxios
    .get(`${urlOrigin}/user`)
    .then((resp) => {
      // Set users list
      dispatch(userActions.setUsers(resp.data));

      // dispatch(userActions.setUserInfo(resp.data.user));

      // Stop loading
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      // Stop loading
      dispatch(setIsLoading(false));
    });
};

// Promote/Demote user
export const updateRole = (id, role, setModalInfo) => (dispatch) => {
  // Start loading
  dispatch(setIsLoading(true));

  authAxios
    .patch(`${urlOrigin}/user/update-role/${id}`, { role })
    .then((resp) => {
      dispatch(fetchUsers());

      setModalInfo({ isDone: true, show: true });

      dispatch(showPoppup('success', resp.data.message));

      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch(showPoppup('danger', err.response.data.message));

      dispatch(setIsLoading(false));
    });
};
