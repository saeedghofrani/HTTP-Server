//merging arrays//
function mergeById(array1, array2) {
    let result = [];
    result.push(...array2);
    result.push(...array1);
    return result;
}
function read() {
    console.log(result);
}
//function to find obj by id//
function get(id) {
    let i = result.findIndex(x => x.id === id);
    if (i >= 0) {
        return result[i];
    }
    else
        console.log("object with this ID does not exist!");
}
//create function//
function create(obj) {
    for (let i = 0; i < result.length; i++) {
        if (result[i].id === obj.id) {
            alert(`uid is not unique`);
            return;
        }
    }
    result.push(obj);
    alert(`succesful`);
}
//validation//
function isObjectValid(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (value === 'undefined' || value === '') {
            return false;
        }
    }
    return true;
}
//update function//
function update(obj) {
    let i = result.findIndex(x => x.id === obj.id);
    if (i >= 0) {
        for (const [key] of Object.entries(obj)) {
            result[i][key] = obj[key];
        }
        return result;
    }
    else
        console.log("object with this ID does not exist!");
}
//delete function//
function _delete(id) {
    let index = result.findIndex(x => x.id === id);
    if (index >= 0) {
        result.splice(index, 1);
        alert("succesful");
    }
    else
        alert(`couldnt find uid ${id}`);
}

