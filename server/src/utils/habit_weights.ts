export type TransactionCategory = 
| 'Bank Fees'
| 'Community'
| 'Food and Drink'
| 'Healthcare'
| 'Intrest'
| 'Payment'
| 'Recreation'
| 'Service'
| 'Shops'
| 'Transfer'
| 'Travel'


// Most of this is subjective, with minor research to back up claims.
// The weight represents how much a category can be considered a "want" over a "need".
// Ex: a weight of 0 represents a total need while a weight of 1 represent a total want.
export const RAW_HABIT_WEIGHTS = {
    'Bank Fees': 0,
    'Community': 0.1,
    'Food and Drink': 0.5,
    'Healthcare': 0,
    'Intrest': 0,
    'Payment': 0,
    'Recreation': 0.7,
    'Service': 0.1,
    'Shops': 0.8,
    'Transfer': 0.2,
    'Travel': 0.5,
}


const normalizedWeights = function () {
    let totalWeight = 0;
    for (let category in RAW_HABIT_WEIGHTS) {
        const weight = RAW_HABIT_WEIGHTS[category]
        totalWeight += weight
    }

    const normalized_weights = {}
    for (let category in RAW_HABIT_WEIGHTS) {
        const weight = RAW_HABIT_WEIGHTS[category]
        normalized_weights[category] = weight / totalWeight
    }

    return normalized_weights as typeof RAW_HABIT_WEIGHTS
}()

export default normalizedWeights
