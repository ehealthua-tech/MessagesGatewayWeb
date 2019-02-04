import { push } from 'react-router-redux';
import { logout } from '../../../redux/session';
import { PUBLIC_INDEX_ROUTE } from '../../../config';

export const logOut = () => dispatch =>
  dispatch(logout()).then(() => dispatch(push(PUBLIC_INDEX_ROUTE)));
