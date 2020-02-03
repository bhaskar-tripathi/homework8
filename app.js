var fs = require("fs");
var inquirer = require("inquirer");
var path = require("path");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
var userResponse = [];
var myTeam = [];
var cardHTMLHolder = "";

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
        name: "name"
    },
    {
        type: "input",
        message: "Enter Employee ID",
        name: "id"
    },
    {
        type: "input",
        message: "Enter Employee email ID",
        name: "email"
    },
    {
        type: "input",
        message: "Enter your office number: ",
        name: "officeNumber",
        when: (response) => response.emptype === "Manager" ? true : false
    },
    {
        type: "input",
        message: "Enter your Github ID: ",
        name: "github",
        when: (response) => response.emptype === "Engineer" ? true : false
    },
    {
        type: "input",
        message: "Enter your school name: ",
        name: "school",
        when: (response) => response.emptype === "Intern" ? true : false
    }
];

function writeToFile(fileName, htmlContent) {
    fs.writeFile(fileName, htmlContent, function (err) {
        if (err) {
            console.log("Error writing file");
        }
        else {
            console.log("MyTeam Page successfully generated");
        }
    })
}

async function confToContinue() {
    let continueAdd = await inquirer.prompt(
        {
            type: "confirm",
            message: "Continue to enter more team members?",
            name: "addmore"
        }
    );
    return continueAdd.addmore;
}

async function addTeam() {

    do {
        let response = await inquirer.prompt(questions);

        switch (response.emptype) {
            case "Manager":
                let manager = new Manager(response.name, response.id, response.email, response.officeNumber);
                myTeam.push(manager);
                break;

            case "Engineer":
                let engineer = new Engineer(response.name, response.id, response.email, response.github);
                myTeam.push(engineer);
                break;

            case "Intern":
                let intern = new Intern(response.name, response.id, response.email, response.school);
                myTeam.push(intern);
                break;

            default:
                break;
        }

        userResponse.push(response);
    } while (await confToContinue());

}

const init = async () => {

    let abc = await addTeam();

    for (var i = 0; i < myTeam.length; i++) {

        let teamMember = await myTeam[i].getHTMLCard();
        cardHTMLHolder += teamMember;

    }
    
    fs.readFile(path.join(__dirname, "templates/main.html"),{encoding:  "utf8"}, function (err, data) {
        if (err) {
            throw err;
        }
        let htmlContent = data.replace(/@AddTeamCards/g, cardHTMLHolder);

        writeToFile("myTeam.html", htmlContent);
    })

}

init();