import { validationResult, ValidationChain } from 'express-validator'

const validate = (validations: ValidationChain[]) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(422).json({ errors: errors.array() });
    };
};

export default validate;