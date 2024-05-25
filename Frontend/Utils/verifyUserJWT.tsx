/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

export function verifyUserJWT() {
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const userJWT = localStorage.getItem("userJWT");

    if (!userJWT) {
      setUserLogged(false);
      return;
    }

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
