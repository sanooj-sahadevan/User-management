/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser, logoutUser } from "../Redux/User/userSlice"

export function verifyUserJWT() {
  const dispatch = useDispatch();
  const userJWT = localStorage.getItem("userJWT");

  useEffect(() => {
    if (!userJWT) {
      dispatch(logoutUser());
      return;
    }

    async function verifyUser() {
      try {
        const res = await fetch(`http://localhost:3000/user/verifyUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userJWT }),
        });
        const data = await res.json();
        if (data.success) {
          dispatch(loginUser());
        } else {
          dispatch(logoutUser());
        }
      } catch (error) {
        dispatch(logoutUser());
      }
    }

    verifyUser();
  }, [dispatch, userJWT]);

  return useSelector((store) => store.user.userLogged);
}
