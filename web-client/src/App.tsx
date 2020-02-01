import React, { FC } from 'react';
import ThemeProvider from './theme';
import Router from './Router';
import { Auth0Provider } from './hooks/auth0-hook';

const App: FC = () => {
  return (
    <ThemeProvider>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN!}
            client_id={process.env.REACT_APP_AUTH0_CLIENT_ID!}
            audience={process.env.REACT_APP_AUTH0_AUDIENCE}
            redirect_uri={window.location.origin}
        >
        <Router />
        </Auth0Provider>
    </ThemeProvider>
  );
}

export default App;
