import React, { FC } from 'react'
import { useAuth0 } from '../hooks/auth0-hook';

const LoginPage: FC = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={loginWithRedirect}>Login</button>
}

export default LoginPage