const Employee = require("../lib/employee");
var fs = require("fs");

class Manager extends Employee {
    constructor(name, id, email, title, officeNumber) {
        super(name, id, email, title);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return "Manager";
    }
    
    async getHTMLCard() {
        
        let data = fs.readFileSync(require("path").join(__dirname, "../templates/manager.html"),{encoding: "utf8"})
            .replace("@Name", super.getName())
            .replace("@Title", this.getRole())
            .replace("@ID", super.getID())
            .replace("@Email", super.getEmail())
            .replace("@OfficeNumber", this.getOfficeNumber());
            return data;
    }
    
}

module.exports = Manager;