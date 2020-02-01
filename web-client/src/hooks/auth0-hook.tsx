// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";


interface AuthContext {
  isAuthenticated: boolean;
  user?: any;
  token?: string;
  loading: boolean;
  handleRedirectCallback: () => void;
  getIdTokenClaims: (options: getIdTokenClaimsOptions) => Promise<IdToken>;
  loginWithRedirect: (options: RedirectLoginOptions) => Promise<void>;
  getTokenSilently: (options: GetTokenSilentlyOptions) => Promise<any>;
  getTokenWithPopup: (options: GetTokenWithPopupOptions) => Promise<string>;
  logout: (options: LogoutOptions) => void;
}

type ProviderContext = Auth0ClientOptions & { children: React.ReactNode; }

export const Auth0Context = React.createContext<AuthContext>({} as any);
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  ...initOptions
}: ProviderContext) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState<string>();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);

  const loginUser = async (user: any, authClient = auth0Client) => {
    setIsAuthenticated(true)
    const token = await authClient!.getTokenSilently();
    setToken(token);
    setUser(user);

    // identify user
    
  }

  useEffect(() => {
    const initAuth0 = async () => {
    const auth0FromHook = await createAuth0Client(initOptions as Auth0ClientOptions);
    setAuth0(auth0FromHook);

    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        await auth0FromHook.handleRedirectCallback();
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const isAuthenticated = await auth0FromHook.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        loginUser(user, auth0FromHook);
    }

    setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();
    setLoading(false);
    loginUser(user);
  };
  return (
    <Auth0Context.Provider
    value={{
        isAuthenticated,
        user,
        loading,
        handleRedirectCallback,
        token,
        getIdTokenClaims: (options: getIdTokenClaimsOptions) => auth0Client!.getIdTokenClaims(options),
        loginWithRedirect: (options: RedirectLoginOptions) => auth0Client!.loginWithRedirect(options),
        getTokenSilently: (options: GetTokenSilentlyOptions) => auth0Client!.getTokenSilently(options),
        getTokenWithPopup: (options: GetTokenWithPopupOptions) => auth0Client!.getTokenWithPopup(options),
        logout: (options: LogoutOptions) => auth0Client!.logout(options)
    }}
    >
    {children}
    </Auth0Context.Provider>
  );
};
