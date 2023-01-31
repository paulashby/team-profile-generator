class Validator {
    
    constructor () {
        this.tests = {
            str: input => typeof input === "string" && /^[a-zA-z]+([\s][a-zA-Z]+)*$/i.test(input),
            num: input => typeof input === "number" && !isNaN(input) && Number.isInteger(input),
            email: input => typeof input === "string" && /^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/i.test(input),
            // https://github.com/shinnn/github-username-regex
            github: input => typeof input === "string" && /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(input)
        };

        this.validations = {
            str: {
                validate: input => {
                    if (!this.isValid(input, "str")){
                        console.log("\n\nPlease use only letters or spaces\n");
                        return false;
                    }
                    return true;
                },
                filter: input => this.filterInput(input, "str"),        
            },
            num: {
                validate: input => {
                    if (!this.isValid(input, "num")){
                        console.log("\n\nPlease use only integers\n");
                        return false;
                    }
                    return true;
                },
                filter: input => this.filterInput(input, "num"),
            },
            email: {
                validate: input => {
                    if (!this.isValid(input, "email")){
                        console.log("\n\nPlease provide a valid email address\n");
                        return false;
                    }
                    return true;
                },
                filter: input => this.filterInput(input, "email"),
            },
            github: {
                validate: input => {
                    if (!this.isValid(input, "github")){
                        console.log("\n\nPlease provide a valid github username\n");
                        return false;
                    }
                    return true;
                },
                filter: input => this.filterInput(input, "github"),
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