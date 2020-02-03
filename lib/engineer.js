const Employee = require("../lib/employee");
var fs = require("fs");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email, "Engineer");
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
    
    getHTMLCard() {
        let data = fs.readFileSync(require("path").join(__dirname,"../templates/engineer.html"),{encoding: "utf8"})
            .replace("@Name", super.getName())
            .replace("@Title", this.getRole())
            .replace("@ID", super.getId())
            .replace("@Email", super.getEmail())
            .replace("@Github", this.getGithub());
            return data;
    }

}

module.exports = Engineer;