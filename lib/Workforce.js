const path = require("path");
const fs = require("fs");

class Workforce {

    constructor(workforceFile) {
        this.workforceFile = workforceFile;
        this.workforceData = [];
        
        fs.readFile(workforceFile, "utf8", (err, data) => {
            if (err) throw err;
            if (data) {
                const parsedData = JSON.parse(data);                
                if (Array.isArray(parsedData)) {
                    this.workforceData = this.workforceData.concat(parsedData);
                } else {
                    const err = new Error(
                        "Unable to read workforce data"
                    );
                }
            }
        });
    }

    addEmployee(employee) {
        if (this.hasEmployee(employee.id)) {
            throw new Error("Duplicate employee number");
        }
        this.updateWorkforce(employee.id);
        return employee;        
    }

    hasEmployee(id) {
        return this.workforceData.includes(id);
    }

    updateWorkforce(employeeId) {
        this.workforceData.push(parseInt(employeeId, 10));
        const data = JSON.stringify(this.workforceData);
        fs.writeFile(this.workforceFile, data, (err) => {
            if (err) throw err;
            console.log("Workforce updated");
        });
    }

    getWorkforceData() {
        return this.workforceData;
    }
    
    getNextId() {
        if (!this.workforceData.length) return 1;
        // Check availabilty of all ids up to current highest
        const highestId = this.workforceData.sort().pop();
        for (let i = 1; i < highestId; i++) {
            if (!this.workforceData.includes(i)) {
                return i;
            }
        }
        // All possible ids up to current highest are in use - go one higher
        return highestId + 1;
    }
}

module.exports = Workforce;