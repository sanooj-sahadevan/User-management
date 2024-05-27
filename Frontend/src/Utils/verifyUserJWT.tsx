/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { loginUser, logoutUser } from "../Redux/User/userSlice";
import { useDispatch, useSelector } from "react-redux";


export function verifyUserJWT() {
  const [userLogged, setUserLogged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userJWT = localStorage.getItem("userJWT");

    // if (!userJWT) {
    //   dispatch(logoutUser());
    //   return;
    // }

    async function verifyUser() {
      try {
        console.log('verify');
        
        const res = await fetch('http://localhost:3000/user/verifyUser', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userJWT }),
        });
        const data = await res.json();
        if (data.success) {
          setUserLogged(true);
        } else {
          setUserLogged(false);
        }
      } catch (error) {
        setUserLogged(false);
      }
    }

    verifyUser();
  }, []);

  return userLogged;
}
