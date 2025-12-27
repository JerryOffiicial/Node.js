names = ["Jerry", "suda", "undefined"];
ages = [24, 21, 4, 1];


// console.log(names);
module.exports = names; // to use it in another file. we must use the export // can export int/string as well
module.exports = {
    names,ages,// can define a name for this like, name: names
    studentName:names// can define a name for this like, name: names

}// to use it in another file. we must use the export // can export int/string as well
