const Validator = require("../lib/utils/Validator");
const workforce = {
  hasEmployee: (id) => id === 1
};

describe("Validator", () => {
  const e = new Validator(workforce);
  it("Can instantiate a Validator instance", () => {
    expect(typeof(e)).toBe("object");
  });
  describe("isValid", () => {
    it("Should accept valid string", () => {
      const testValue = "John Smith";
      expect(e.isValid(testValue, "str")).toBe(true);
    });
    
    it("Should reject string containing special character", () => {
      const testValue = "John Sm*th";
      expect(e.isValid(testValue, "str")).toBe(false);
    });
    
    it("Should reject string containing number", () => {
      const testValue = "John Sm1th";
      expect(e.isValid(testValue, "str")).toBe(false);
    });
    
    it("Should accept valid number", () => {
      const testValue = 1;
      expect(e.isValid(testValue, "num")).toBe(true);
    });
    
    it("Should reject floating point numbers", () => {
      const testValue = 1.3;
      expect(e.isValid(testValue, "num")).toBe(false);
    });
    
    it("Should reject num string", () => {
      const testValue = "1";
      expect(e.isValid(testValue, "num")).toBe(false);
    });

    it("Should reject unavailable employeeId", () => {
      const testValue = 1;
      expect(e.isValid(testValue, "employeeId")).toBe(false);
    });

    it("Should accept available employeeId", () => {
      const testValue = 2;
      expect(e.isValid(testValue, "employeeId")).toBe(true);
    });
    
    it("Should accept valid email address", () => {
      const testValue = "john@example.com";
      expect(e.isValid(testValue, "email")).toBe(true);
    });

    it("Should reject email address without recipient", () => {
      const testValue = "@example.com";
      expect(e.isValid(testValue, "email")).toBe(false);
    });

    it("Should reject email address without @ character", () => {
      const testValue = "johnexample.com";
      expect(e.isValid(testValue, "email")).toBe(false);
    });

    it("Should reject email address without domain", () => {
      const testValue = "john@.com";
      expect(e.isValid(testValue, "email")).toBe(false);
    });

    it("Should reject email address without top level domain", () => {
      const testValue = "john@example";
      expect(e.isValid(testValue, "email")).toBe(false);
    });

    it("Should reject github username with illegal character", () => {
      const testValue = "my_username";
      expect(e.isValid(testValue, "github")).toBe(false);
    });

    it("Should reject github username with consecutive dashes", () => {
      const testValue = "my--username";
      expect(e.isValid(testValue, "github")).toBe(false);
    });

    it("Should reject github username starting with dash", () => {
      const testValue = "-my-username";
      expect(e.isValid(testValue, "github")).toBe(false);
    });

    it("Should reject github username ending with dash", () => {
      const testValue = "my-username-";
      expect(e.isValid(testValue, "github")).toBe(false);
    });

    it("Should reject github username longer than 39 characters", () => {
      const testValue = "my-username-is-really-really-really-long";
      expect(e.isValid(testValue, "github")).toBe(false);
    });

    it("Should accept a valid github username", () => {
      const testValue = "my-username";
      expect(e.isValid(testValue, "github")).toBe(true);
    });

  });
  describe("getValidation", () => {
    it("Should return a string validation object that accepts valid input", () => {
      const testValue = "My string";
      const validation = e.getValidation("str");
      expect(validation.validate(testValue)).toBe(true);
    });

    it("Should return a string validation object that rejects invalid input", () => {
      const testValue = "My str*ng";
      const validation = e.getValidation("str");
      expect(validation.validate(testValue)).toBe("Please use only letters or spaces");
    });

    it("Should return a number validation object that accepts valid input", () => {
      const testValue = 1;
      const validation = e.getValidation("num");
      expect(validation.validate(testValue)).toBe(true);
      expect(validation.filter(testValue)).toEqual(testValue);
    });

    it("Should return a number validation object that rejects invalid input", () => {
      const testValue = 0.5;
      const validation = e.getValidation("num");
      expect(validation.validate(testValue)).toBe("Please use only integers");
      expect(validation.filter(testValue)).toEqual("");
    });

    it("Should return a employeeId validation object that rejects non-numeric strings", () => {
      const testValue = "One";
      const validation = e.getValidation("employeeId");
      expect(validation.validate(testValue)).toBe("Please use only integers");
    });

    it("Should return a employeeId validation object that rejects floating point strings", () => {
      const testValue = "1.5";
      const validation = e.getValidation("employeeId");
      expect(validation.validate(testValue)).toBe("Please use only integers");
    });

    it("Should return a employeeId validation object that accepts available id", () => {
      const testValue = "2";
      const validation = e.getValidation("employeeId");
      expect(validation.validate(testValue)).toBe(true);
    });

    it("Should return a employeeId validation object that rejects unavailable id", () => {
      const testValue = "1";
      const validation = e.getValidation("employeeId");
      expect(validation.validate(testValue)).toBe("Employee number already in use");
    });

    it("Should return an email validation object that accepts valid input", () => {
      const testValue = "john@example.com";
      const validation = e.getValidation("email");
      expect(validation.validate(testValue)).toBe(true);
    });

    it("Should return an email validation object that rejects invalid input", () => {
      const testValue = "john@example";
      const validation = e.getValidation("email");
      expect(validation.validate(testValue)).toBe("Please provide a valid email address");
    });

    it("Should return a github validation object that accepts valid input", () => {
      const testValue = "my-username";
      const validation = e.getValidation("github");
      expect(validation.validate(testValue)).toBe(true);
    });

    it("Should return a github validation object that rejects invalid input", () => {
      const testValue = "my--username";
      const validation = e.getValidation("github");
      expect(validation.validate(testValue)).toBe("Please provide a valid github username");
    });
  });
});