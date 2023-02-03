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

  test("Should set workforceFile in constructor", () => {
    expect(e.workforceFile).toBe(workforceFile);
  });

  test("Should return workforceData via getWorkforceData() function", () => {
    const testValue = [];
    expect(e.getWorkforceData()).toEqual(testValue);
  });

  test("Should determine that available employeeId is not in use", () => {
    e.workforceData = [1,2,3,4];
    const testValue = 5;
    expect(e.hasEmployee(testValue)).toBe(false);
  });

  test("Should determine that unavailable employeeId is in use", () => {
    e.workforceData = [1,2,3,4];
    const testValue = 3;
    expect(e.hasEmployee(testValue)).toBe(true);
  });
  
  test("Should add a new employee via addEmployee() function when given id is available", () => {
    e.workforceData = [1,2,3,4];
    const testValue = {id: 5};
    expect(e.addEmployee(testValue)).toBe(testValue);
  });

  test("Should throw error when addEmployee() function passed unavailabe id", () => {
    e.workforceData = [1, 2, 3, 4];
    const testValue = {id: 2};
    const err = new Error(
      "Duplicate employee number"
    );
    const cb = () => e.addEmployee(testValue);
    expect(cb).toThrowError(err);
  });
  
  test("Should update workforce file via updateWorkforce() function", () => {
    e.workforceData = [];
    const testValue = [3];
    e.updateWorkforce(3);
    expect(e.getWorkforceData()).toEqual(testValue);
  });
  
  test("Should return lowest available id via getNextId() function", () => {
    e.workforceData = [1,3,7];
    const testValue = 2;
    expect(e.getNextId()).toEqual(testValue);
  });
