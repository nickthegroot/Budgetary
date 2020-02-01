import React, { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth0 } from '../hooks/auth0-hook';

export interface Props {
    path: string | string[];
    component: React.ComponentType<any>;
    exact?: boolean;
}

const AuthenticatedRoute: FC<Props> = ({ component: Comp, ...props }) => {
    const { loading, isAuthenticated } = useAuth0()
    if (loading) return <div />

    return (
        <Route
            {...props}
            component={(props: any) => (
                isAuthenticated ? (
                    <Comp {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            )}
        />
    );
};

export default AuthenticatedRoute