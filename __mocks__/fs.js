"use strict";

const fs = jest.createMockFromModule("fs");

let mockEmployees = "";

function readFile(filepath, encoding, callback) {
    return JSON.stringify(mockEmployees);
}

function writeFile(filepath, data, callback) {
    return true;
}

fs.readFile = readFile;
fs.writeFile = writeFile;

module.exports = fs;