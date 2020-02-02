import axios from 'axios';
import { useAuth0 } from './auth0-hook'

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:4090'

export const useServer = () => {
    const { getTokenSilently } = useAuth0();
    const getAuthHeader = async () => {
        const serverToken = await getTokenSilently()
        if (!serverToken) throw new Error('Unauthenticated')
        const requestHeader = { headers: { Authorization: `Bearer ${serverToken!}` } }

        return requestHeader;
    }
    
    const savePlaidToken = async (plaidToken: string) => {
        const req = await axios.post(`${SERVER_URL}/plaid/public_token`, { public_token: plaidToken }, await getAuthHeader())
        return req.data
    }
    const checkPlaidToken = async () => {
        try {
            await axios.get(`${SERVER_URL}/plaid/public_token/exists`, await getAuthHeader())
        } catch (e) {
            return false
        }

        return true
    }
    const getBudgetRecommendations = async (goal: number) => {
        const req = await axios.post(`${SERVER_URL}/budget/recommend`, { goal }, await getAuthHeader())
        return req.data
    }

    return {
        savePlaidToken,
        checkPlaidToken,
        getBudgetRecommendations
    }
}
