class Employee {
    constructor(name, id, email, title) {
        this.name = name;
        this.id = id;
        this.title = title;
        this.email = email;
    }
    getName() {
        return this.name;
    }
    getID() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return "Employee";
    }


}

module.exports = Employee;