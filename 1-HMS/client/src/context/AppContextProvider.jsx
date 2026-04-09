import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );
  const [userData, setUserData] = useState(false);

  // Fetch doctors inside the effect itself
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
        if (data.success) {
          setDoctors(data.doctors);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    fetchDoctors();
  }, [backendUrl]);

  // Fetch user profile inside the effect itself
  useEffect(() => {
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
          headers: { token },
        });

        if (data.success) {
          setUserData(data.userData);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    fetchUserProfile();
  }, [backendUrl, token]);

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;