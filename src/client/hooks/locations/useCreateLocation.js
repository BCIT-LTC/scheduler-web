import Cookies from "js-cookie";
import { API_BASE_URL } from '../../../constants';

const url = `${API_BASE_URL}/locations`;

const addLocation = async (payload) => {
  console.log(JSON.stringify(payload));
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    console.log(response)
    response
      .json()
      .then((data) => {
        console.log('API response: ', data);
      })
      .catch((error) => {
        console.error('API error: ', error);
      });
  });
};

  export default addLocation;