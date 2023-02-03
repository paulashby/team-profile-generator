const Workforce = require("../Workforce");

class Validator {
    
    constructor (workforce) {
        this.workforce = workforce;
        this.tests = {
            str: input => typeof input === "string" && /^[a-zA-z]+([\s][a-zA-Z]+)*$/i.test(input),
            num: input => typeof input === "number" && !isNaN(input) && Number.isInteger(input),
            employeeId: input => !this.workforce.hasEmployee(input),
            email: input => typeof input === "string" && /^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/i.test(input),
            // https://github.com/shinnn/github-username-regex
            github: input => typeof input === "string" && /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(input)
        };

        this.validations = {
            str: {
                validate: input => {
                    if (!this.isValid(input, "str")){
                        return "Please use only letters or spaces";
                    }
                    return true;
                },        
            },            
            employeeId: {
                validate: input => {
                    const num = parseFloat(input);

                    if (!this.isValid(num, "num")){
                        return "Please use only integers";
                    }
                    if (!this.isValid(num, "employeeId")){
                        return "Employee number already in use";
                    }
                    return true;
                },
            },
            num: {
                validate: input => {
                    if (!this.isValid(input, "num")){
                        return "Please use only integers";
                    }
                    return true;
                },
                // Number only clears if filtered
                filter: input => this.filterInput(input, "num"),
            },
            email: {
                validate: input => {
                    if (!this.isValid(input, "email")){
                        return "Please provide a valid email address";
                    }
                    return true;
                },
            },
            github: {
                validate: input => {
                    if (!this.isValid(input, "github")){
                        return "Please provide a valid github username";
                    }
                    return true;
                },
            },
        }
    }

    isValid(input, type) {
        // Use type argument to route to correct test
        return this.tests[type](input);
    }

    getValidation(type) {
        return this.validations[type];
    }
    
    filterInput(input, type) {
        return this.isValid(input, type) ? input : "";
    }
}

module.exports = Validator;