import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useGetUsersList = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
 
  useEffect(() => {
    fetch(
        "/api/users",
        {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')} `,
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        }
    )
    .then((res) => res.json())
    .then((data) => {
        seterror(data.error)
        setdata(data)
        setloading(false)
    }).catch((err) => {
        console.log(err)
        seterror(err)
        setloading(false)
    })
  }, []);
 
  return { data, loading, error };
};
 
export default useGetUsersList;
