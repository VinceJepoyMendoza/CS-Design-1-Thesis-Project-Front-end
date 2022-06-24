import { authAxios, urlOrigin } from './userActions';
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
