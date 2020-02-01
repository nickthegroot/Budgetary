import createState from 'react-copy-write'

export interface AuthContext {
    accessToken?: string,
}

export const { Consumer, Provider, mutate } = createState<AuthContext>({})