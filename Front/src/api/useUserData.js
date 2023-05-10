import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API } from "../constant/constant";


const useUserData = (token) => {
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
      if (!token) return;
  
      const decodedToken = jwt_decode(token);
      console.log(decodedToken)
      const url = `${API}/users/details/${decodedToken?.id}`;
  
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUserData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);
  
    return userData;
  };
  
  

  export default useUserData;

  