const fs = require("fs");

module.exports = function (path){
    const files = fs.readdirSync(path);
    const listOfNames = [];
    
    files.forEach(file => {
        const filename = file.replace(/\.\w+$/, "");
        if (filename.toLowerCase() !=="readme") {
            listOfNames.push(filename);
        }
    });

    return listOfNames;
}