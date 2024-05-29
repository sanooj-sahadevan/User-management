/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginAdmin, logoutAdmin } from "../Redux/Admin/adminSlice";

export function verifyAdminJWT() {
  const dispatch = useDispatch();
  const adminJWT = localStorage.getItem("adminJWT");
  console.log(adminJWT);
  
  useEffect(() => {
    if (!adminJWT) {
      dispatch(logoutAdmin());
      return;
    }

    async function verifyAdmin() {
      try {
        const response = await fetch(`http://localhost:3000/admin/verifyAdmin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ adminJWT }),
        });

        const data = await response.json();

        if (data.success) {
          dispatch(loginAdmin());
        } else {
          dispatch(logoutAdmin());
        }
      } catch (error) {
        console.error("Verification failed", error);
        dispatch(logoutAdmin());
      }
    }

    verifyAdmin();
  }, [adminJWT, dispatch]);

  return useSelector((store: any) => store.admin.adminLogged);
}
