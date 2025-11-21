import { useState, useEffect } from "react";
import API from "../api/Axios.jsx";

const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    API.get(url)
      .then((res) => {
        if (isMounted) {
          setData(res.data);
          setIsPending(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.response?.data?.message || err.message);
          setIsPending(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isPending, error };
};

export default useAxios;

//custom hook that'll be used to fetch data from the backend API (using axios this time around);
