const Workforce = require("../lib/Workforce");
const path = require("path");
const fs = require("fs");

jest.mock("fs");

beforeAll(() => {
    // Clears the database and adds some testing data.
    // Jest will wait for this promise to resolve before running tests.
    workforceFile = path.join(__dirname, "..", "data", "workforce.json");
    e = new Workforce(workforceFile);
  });

  test("Sets workforceFile in constructor", () => {
    expect(e.workforceFile).toBe(workforceFile);
  });

  test("Can return workforceData via getWorkforceData() function", () => {
    const testValue = [];
    expect(e.getWorkforceData()).toEqual(testValue);
  });

  test("Can determine that employeeId is available", () => {
    e.workforceData = [1,2,3,4];
    const testValue = 5;
    expect(e.hasEmployee(testValue)).toBe(false);
  });

  test("Can determine that employeeId is unavailable", () => {
    e.workforceData = [1,2,3,4];
    const testValue = 3;
    expect(e.hasEmployee(testValue)).toBe(true);
  });
  
  test("Can add a new employee", () => {
    e.workforceData = [1,2,3,4];
    const testValue = {id: 5};
    expect(e.addEmployee(testValue)).toBe(testValue);
  });

  test("AddEmployee throws error with duplicate employee number", () => {
    e.workforceData = [1, 2, 3, 4];
    const testValue = {id: 2};
    const err = new Error(
      "Duplicate employee number"
    );
    const cb = () => e.addEmployee(testValue);
    expect(cb).toThrowError(err);
  });
  
  test("Can update workforce file via updateWorkforce() function", () => {
    e.workforceData = [];
    const testValue = [3];
    e.updateWorkforce(3);
    expect(e.getWorkforceData()).toEqual(testValue);
  });







