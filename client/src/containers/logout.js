import Cookies from 'js-cookie';
export default function Logout() {
  const userEmail = sessionStorage.getItem('userEmail');
  const baseTime = new Date();
  const timezone = baseTime.getTimezoneOffset() * 60000;
  const logoutTime = new Date(Date.now() - timezone).toISOString().slice(0, 19).replace("T", " ");

  fetch('http://localhost:8000/api/logout', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      'Authorization': Cookies.get('jwt')
    },
    body: JSON.stringify({ email: userEmail, logoutTime: logoutTime }),
  })
    .then(() => {
      window.location.href = '/login'
    })
}
