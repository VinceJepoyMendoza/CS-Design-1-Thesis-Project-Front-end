import { authAxios, urlOrigin, showPoppup } from './userActions';
import { productActions } from '../reducers/productSlice';
import { generalActions } from '../reducers/generalSlice';

const { setIsLoading } = generalActions;

// Fetch user's products
export const fetchUserProducts = (id) => async (dispatch) => {
  // Start Loading
  dispatch(setIsLoading(true));

  authAxios
    .get(`${urlOrigin}/products/user/${id}`)
    .then((resp) => {
      // Save products to state
      dispatch(productActions.setItems(resp.data));

      // Stop Loading
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      // Stop Loading
      dispatch(setIsLoading(false));
    });
};

export const fetchProduct = (id) => async (dispatch) => {
  // Start Loading
  dispatch(setIsLoading(true));

  authAxios
    .get(`${urlOrigin}/products/${id}`)
    .then((resp) => {
      // Save product to state
      dispatch(productActions.setCurrProduct(resp.data));

      // Stop Loading
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      // Stop Loading
      dispatch(setIsLoading(false));
    });
};

// Create new product
export const createProduct = (product, owner) => async (dispatch) => {
  // Start Loading
  dispatch(setIsLoading(true));

  authAxios
    .post(`${urlOrigin}/products`, product)
    .then((resp) => {
      dispatch(fetchUserProducts(owner));

      dispatch(showPoppup('success', resp.data.message));

      // Stop Loading
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      // More than 1 input error
      const inputs = err.response.data.inputs;

      // show error message
      !inputs
        ? dispatch(showPoppup('danger', err.response.data.message))
        : dispatch(showPoppup('danger', err.response.data));

      // Stop Loading
      dispatch(setIsLoading(false));
    });
};

// Create new product
export const updateProduct =
  (product, id, userId, setprodConfig) => async (dispatch) => {
    // Start Loading
    dispatch(setIsLoading(true));

    authAxios
      .patch(`${urlOrigin}/products/${id}`, product)
      .then((resp) => {
        dispatch(fetchUserProducts(userId));

        setprodConfig({ show: false });

        dispatch(showPoppup('success', resp.data.message));

        // Stop Loading
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        // More than 1 input error
        const inputs = err.response.data.inputs;

        // show error message
        !inputs
          ? dispatch(showPoppup('danger', err.response.data.message))
          : dispatch(showPoppup('danger', err.response.data));

        // Stop Loading
        dispatch(setIsLoading(false));
      });
  };

export const deleteProduct = (prodId, userId) => async (dispatch) => {
  // Start Loading
  dispatch(setIsLoading(true));

  authAxios
    .delete(`${urlOrigin}/products/${prodId}`)
    .then((resp) => {
      dispatch(fetchUserProducts(userId));

      dispatch(showPoppup('success', resp.data.message));

      // Stop Loading
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(showPoppup('danger', err.response.data.message));

      // Stop Loading
      dispatch(setIsLoading(false));
    });
};
