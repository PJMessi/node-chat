const Validator = require('validatorjs');
const createError = require('http-errors');

module.exports = class RequestValidator {

    /**
     * Validate the given data with given rules and throw given messages on error.
     * @param {*} dataToValidate 
     * @param {*} rulesForValidation 
     * @param {*} validationMessages 
     */
    validate = async (dataToValidate, rulesForValidation, validationMessages={}) => {
        return new Promise((resolve, reject) => {
            const validator = new Validator(dataToValidate, rulesForValidation, validationMessages);

            validator.checkAsync(() => { resolve(); }, () => {
                const errorMessages = validator.errors.all();
                reject(createError.UnprocessableEntity(errorMessages));
            });
            
        })
    }

}