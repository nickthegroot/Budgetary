import React from 'react'
import { useAuth0 } from './auth0-hook'
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:4090'

export const useServer = () => {
    const { getTokenSilently } = useAuth0();
    
    const savePlaidToken = async (plaidToken: string) => {
        const serverToken = await getTokenSilently()
        if (!serverToken) throw new Error('Unauthenticated')
        const requestHeader = { headers: { Authorization: `Bearer ${serverToken!}` } }

        return axios.post(`${SERVER_URL}/plaid/public_token`, { public_token: plaidToken }, requestHeader)
    }

    return {
        savePlaidToken
    }
}
