const Employee = require("../lib/employee");
var fs = require("fs");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email, "Intern");
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        return "Intern";
    }
    getHTMLCard() {
        let data = fs.readFileSync(require("path").join(__dirname,"../templates/intern.html"),{encoding: "utf8"})
            .replace("@Name", super.getName())
            .replace("@Title", this.getRole())
            .replace("@ID", super.getId())
            .replace("@Email", super.getEmail())
            .replace("@School", this.getSchool());
            return data;
    }

}


module.exports = Intern;