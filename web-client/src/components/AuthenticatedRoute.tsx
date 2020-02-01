import React, { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Consumer as AuthConsumer } from '../context/auth';
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
        <AuthConsumer select={[auth => auth.accessToken]}>
            {(accessToken?: string) => {
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
            }}
        </AuthConsumer>
    );
};

export default AuthenticatedRoute