import React, { FC } from "react";
import { useAuth0 } from "../hooks/auth0-hook";
import Button from "../components/button";

const LoginPage: FC = () => {
    const { loginWithRedirect } = useAuth0();

    return <div><Button onClick={loginWithRedirect}>Login</Button></div>;
};

export default LoginPage;
