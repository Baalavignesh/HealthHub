import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { setTokens } from "../features/auth/authSlice";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { userInformation } = useSelector(
      (state: RootState) => state.authStore
    );
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkAuth = async () => {
      console.log('checking auth')
      console.log(userInformation)
      if (Object.keys(userInformation).length == 0) {
        console.log('no user data')
        let info = localStorage.getItem("user");
        let usertype_local = localStorage.getItem("usertype");
        console.log(info, usertype_local);

        if (info) {
          dispatch(
            setTokens({
              userInformation: info,
              userType: usertype_local
            })
          );
        } else {
          navigate("/dashboard");
        }

        navigate("/login");
        return;
      } else {
        console.log('user found')
        navigate("/dashboard");
      }
      setLoading(false);
    };

    useEffect(() => {
      checkAuth();
    }, [userInformation]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

