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
    
    const savePlaidToken = async (plaidToken: string) => axios.post(`${SERVER_URL}/plaid/public_token`, { public_token: plaidToken }, await getAuthHeader())
    const getBudgetRecommendations = async (goal: number) => axios.post(`${SERVER_URL}/budget/recommend`, { goal }, await getAuthHeader())

    return {
        savePlaidToken,
        getBudgetRecommendations
    }
}
