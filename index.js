const Workforce = require("./lib/Workforce");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Validator = require("./lib/utils/Validator");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const workforceFile = path.join(__dirname, "data", "workforce.json");
const workforce = new Workforce(workforceFile);

const render = require("./src/page-template.js");
const validator = new Validator();

// Gather information about the development team members, and render the HTML file.
const roleData = {
    manager: {
        type: "number",
        specifics: "officeNumber",
        prompt: "Office Number:",
        validation: "num",
        construct: Manager // Allows us to call constructor via object 'construct' key      
    },
    engineer: {
        type: "Input",
        specifics: "github",
        prompt: "GitHub username:",
        validation: "github",
        construct: Engineer
    },
    intern: {
        type: "Input",
        specifics: "school",
        prompt: "School:",
        validation: "str",
        construct: Intern
    },
};

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "name:",
        ...validator.getValidation("str"),
    },
    {
        type: "number",
        name: "id",
        message: "Employee ID:",
        ...validator.getValidation("num"),
    },
    {
        type: "input",
        name: "email",
        message: "Email:",
        ...validator.getValidation("email"),
    },
];

const team = [];

inquirer
    .prompt(getQuestions("manager"))
    .then((data) => {
        addMember("manager", data);
    });

function getQuestions(role) {

    employeeQuestions[0].message = getRoleMessage(role);

    return employeeQuestions.concat([{
        type: roleData[role].type,
        name: roleData[role].specifics,
        message: roleData[role].prompt,
        ...validator.getValidation(roleData[role].validation),
    }])
}

function addMember(role, memberData) {
    
    const memberArgs = [
        memberData.name,
        memberData.id,
        memberData.email,
        memberData[roleData[role].specifics]
    ];
    const member = workforce.addEmployee(new (roleData[role].construct)(...memberArgs));
    team.push(member);

    inquirer // Add another member or finish
        .prompt([
            {
                type: "list",
                name: "role",
                message: "Please add a team member",
                choices: ["Engineer", "Intern", "Done"],
                default: 2
            }
        ])
        .then((data) => configureMember(data));
}

function configureMember(data) {

    const role = data.role.toLowerCase();
    if (role === "done") {
        return writeToFile(team);
    }
    inquirer // Configure team member            
        .prompt(getQuestions(role))
        .then((memberData) => {
            addMember(role, memberData);
        });
}

function getRoleMessage(role) {

    return role.charAt(0).toUpperCase() + role.slice(1) + " name:";
}

// function to write HTML file
function writeToFile(data) {

    fs.writeFile(outputPath, render(data), (err) => {
        err ? console.log(err) : console.log("Success");
    });
}