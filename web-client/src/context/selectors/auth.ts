import { AuthContext } from '../auth';

export const getPlaidAccess = (context: AuthContext) => context.plaidAccessToken
export const getServerAccess = (context: AuthContext) => context.serverAccessToken