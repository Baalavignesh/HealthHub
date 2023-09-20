import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { accessToken, refreshToken, idToken } = useSelector(
      (state: RootState) => state.authStore
    );
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = async () => {

      setTimeout(() => {
        if (!accessToken) {
          navigate("/");
          return;
        }
        else {
          navigate("/dashboard")
        }
        setLoading(false);

      }, 3000)

    };

    useEffect(() => {
      checkAuth();
    }, [accessToken, refreshToken, idToken]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
