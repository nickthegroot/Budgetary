import createState from 'react-copy-write'

export interface AuthContext {
    serverAccessToken?: string;
    plaidAccessToken?: string;
}

export const { Consumer, Provider, mutate } = createState<AuthContext>({})