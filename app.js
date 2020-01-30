var fs = require("fs");
var inquirer = require("inquirer");
var userResponse = [];

var questions = [
    {
        type: "list",
        message: "Select Employee Type: ",
        name: "emptype",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: "input",
        message: "Enter Employee Name",
        name: "empname"
    },
    {
        type: "input",
        message: "Enter Employee ID",
        name: "empid"
    },
    {
        type: "input",
        message: "Enter Employee email ID",
        name: "empemail"
    },
    {
        type: "input",
        message: "Enter your office number: ",
        name: "offnum",
        when: (response) => response.emptype === "Manager" ? true : false
    },
    {
        type: "input",
        message: "Enter your Github ID: ",
        name: "gitid",
        when: (response) => response.emptype === "Engineer" ? true : false
    },
    {
        type: "input",
        message: "Enter your school name: ",
        name: "schoolname",
        when: (response) => response.emptype === "Intern" ? true : false
    }
];


function addTeam() {
    inquirer.prompt(questions).then(function (response) {
        userResponse.push(response);

        inquirer.prompt([
            {
                type: "confirm",
                message: "Continue to enter more team members?",
                name: "addmore"
            }
        ]).then(function (response) {
            if (response.addmore) {
                addTeam();
            }
           
        });
    });
}

function init() {

    addTeam();

    console.log(userResponse);
}

init();