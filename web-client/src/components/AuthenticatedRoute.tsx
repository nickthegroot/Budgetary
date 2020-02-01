import React, { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Consumer as AuthConsumer } from '../context/auth';
import { getServerAccess } from '../context/selectors/auth'

export interface Props {
    path: string | string[];
    component: React.ComponentType<any>;
    exact?: boolean;
}

const AuthenticatedRoute: FC<Props> = ({ component: Comp, ...props }) => {
    return (
        <AuthConsumer select={[getServerAccess]}>
            {(serverToken?: string) => {
                return (
                    <Route
                        {...props}
                        component={(props: any) => (
                            serverToken ? (
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