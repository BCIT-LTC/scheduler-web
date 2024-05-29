import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useGetLocations = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/locations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        });
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  if (!data || !data.length) console.log("No data found");

  return { data, loading, error };
}
export default useGetLocations;
