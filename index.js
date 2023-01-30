const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Gather information about the development team members, and render the HTML file.
const roleData = {
    manager: {
        specifics: "officeNumber",
        prompt: "Office Number:",
        construct: Manager // Allows us to call constructor via object 'construct' key      
    },
    engineer: {
        specifics: "github",
        prompt: "GitHub username:",
        construct: Engineer
    },
    intern: {
        specifics: "school",
        prompt: "School:",
        construct: Intern
    },
};

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "name:",
    },
    {
        type: "number",
        name: "id",
        message: "Employee ID:",
    },
    {
        type: "input",
        name: "email",
        message: "Email:",
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
        type: "input",
        name: roleData[role].specifics,
        message: roleData[role].prompt,
    }])
}

function addMember(role, memberData) {
    const memberArgs = [
        memberData.name,
        memberData.id,
        memberData.email,
        memberData[roleData[role].specifics]
    ];
    const member = new (roleData[role].construct)(...memberArgs);
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