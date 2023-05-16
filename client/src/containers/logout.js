import Cookies from 'js-cookie';

/**
 *  Logout function will remove the JWT token from the cookies and
 *  send the user back to the home page.
 */
export default function Logout() {
  Cookies.remove('jwt');
  window.location.href = '/';
}
