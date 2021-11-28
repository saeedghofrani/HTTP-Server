////////////global var //////////
// data array//
let result;
//page number//
let pageNum = 1;
//item per page//
itemPerPage = 3;
//geting data from api //
$(document).ready(function () {
    //toester in the beggining//
    toester('Welcome to our website', 'gray', 'black');
    $.ajax({
        type: "GET",
        url: "https://reqres.in/api/users?page=2",
        success: function (responseAraay1) {
            console.log(responseAraay1)
            $.ajax({
                type: "GET",
                url: "https://reqres.in/api/users?page=1",
                success: function (responseAraay2) {
                    console.log(responseAraay2);
                    //merge 2 data//
                    result = mergeById(responseAraay1.data, responseAraay2.data);
                    //call man function//
                    refreshUI();
                    $('.cardUI').fadeOut('slow');
                },
                error: function () {
                    //in case of 404//
                    window.location.replace('/25%2008.20/P1/404page.html');
                }
            });
        },
        error: function () {
            //in case of 404//
            window.location.replace('/25%2008.20/P1/404page.html');
        }
    });
});


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


//main function //
function refreshUI() {
    //clear all cards//
    $('#cardSection').html('');
    //countign cards in page and page numbers//
    for (let i = (pageNum - 1) * itemPerPage; i < Math.min(result.length, (pageNum) * itemPerPage); i++) {
        createCard(result[i]);
    }

    //making next and Previous button active//
    if (pageNum === 1) {
        $('#Previous').addClass("disabled");
    }
    else {
        $('#Previous').removeClass('disabled');
    }
    if (pageNum == (Math.ceil(result.length / itemPerPage))) {
        $('#Next').addClass('disabled');
    }
    else {
        $('#Next').removeClass('disabled');
    }
    pagination();
    //$(`#pagination_${pageNum}`).addClass("active");
}

// build cards by an object//
function createCard(record) {
    $('#cardSection').append(`
    <div class="cardUI mt-4 d-flex justify-content-center  col-12 col-sm-6 col-md-4 p-4">
        <div class="card w-100">
            <img src=${record.avatar} class="card-img-top " alt="avatar">
            <div class="card-body">
                <h5 class="card-title ">${record.first_name + ' ' + record.last_name}</h5>
                <p class="card-text">${record.email}</p>
                <a href="#" type="button" class="btn btn-primary modalButton col-12" onclick="openModal(${record.id})" id='openModal${record.id}' data-bs-toggle="modal"
                    data-bs-target="#exampleModal">user profile</a>
            </div>
        </div>
    </div>`);
}

//search function //
// $('#searchBtn').click(function search(e) {
//     e.preventDefault();
//     let inp_search = $('#search').val();
//     if (inp_search - 1) {
//         let idFind = result.find(x => x.id == (inp_search));
//         openModal(Number(inp_search));
//     }
//     else {
//         console.log('str');
//     }
// });


//set page function and call main function//
function setPage(page) {
    pageNum = page;
    refreshUI();
}

//get card number per page by user and make cards again//
function setItemCount() {
    let inp_item = $('#itemPerPage').val();

    if (isNaN(inp_item)) {
        alert("Input must be a nuber from 1 to ...");
        return false;
    }
    else {
        itemPerPage = inp_item;
        console.log(itemPerPage);
    }
    refreshUI();
}

//build pagination buttons//
function pagination() {
    $('#pagination').html('');
    for (let i = 0; i < Math.ceil(result.length / itemPerPage); i++) {
        if (i == pageNum - 1) {
            console.log(pageNum);
            $('#pagination').append(
                `<li class="active page-item" id="pagination_${i + 1}"><a onclick="setPage(${i + 1})"  class="page-link" href="#">${i + 1}</a></li>`);
        }
        else
            $('#pagination').append(
                `<li class="page-item" id="pagination_${i + 1}"><a onclick="setPage(${i + 1})"  class="page-link" href="#">${i + 1}</a></li>`);

    }
}

//previous button function//
function previousPage() {
    pageNum--;
    console.log(pageNum);
    refreshUI();

}

//next button function//
function nextPage() {
    pageNum++;
    refreshUI();

}

//open modal and fill the information by id //
function openModal(id) {
    let btn_edit = $('#editModal');
    btn_remove = $('#removeModal');
    btn_done = $('#doneModal');
    //if function called by empty tatment mod will be add//
    if (id === undefined) {
        setState('add');
        toester('you are in ADD mode, please fill the table', 'black', 'wight');
        $('#imgModal').attr('src', 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1');
        $('#idModal').val(``);
        $('#firstNameModal').val(``);
        $('#lastNameModal').val(``);
        $('#emailModal').val(``);
        btn_done.prop("onclick", null).off("click");
        btn_done.click(function (e) {
            let newPerson = {
                avatar: $('#imgModal').attr('src'),
                id: Number($('#idModal').val()),
                first_name: $('#firstNameModal').val(),
                last_name: $('#lastNameModal').val(),
                email: $('#emailModal').val()
            };
            if (!isObjectValid(newPerson)) {
                alert('empty field detected');
                return;
            }
            create(newPerson);
            refreshUI();
            $('#exampleModal').modal('toggle');
        });
    }
    //if function called by fill statment mod will be view//
    else {
        let record = get(id);
        setState('view');
        $('#userHeader').text(`Dear ${record.first_name}`);
        $('#imgModal').attr('src', record.avatar);
        $('#idModal').val(`${(record.id)}`);
        $('#firstNameModal').val(`${(record.first_name)}`);
        $('#lastNameModal').val(`${(record.last_name)}`);
        $('#emailModal').val(`${(record.email)}`);
        //remove btn//
        btn_remove.prop("onclick", null).off("click");
        btn_remove.click(function (e) {
            e.preventDefault();
            _delete(record.id);
            refreshUI();
            $('#exampleModal').modal('toggle');
        });
        //done btn//// to update array
        btn_done.prop("onclick", null).off("click");
        btn_done.click(function (e) {
            e.preventDefault();
            let updatePerson = {
                avatar: $('#imgModal').attr('src'),
                id: Number($('#idModal').val()),
                first_name: $('#firstNameModal').val(),
                last_name: $('#lastNameModal').val(),
                email: $('#emailModal').val()
            };
            // validation for object
            if (!isObjectValid(updatePerson)) {
                alert('empty field detected');
                return;
            }
            update(updatePerson);
            //rebuild cards
            refreshUI();
            //close modal//
            $('#exampleModal').modal('toggle');
        });
    }
}
//state for showing modal //
function setState(Mood) {
    let btn_edit = $('#editModal');
    btn_remove = $('#removeModal');
    btn_done = $('#doneModal');
    inp_id = $('#idModal');
    inp_firstName = $('#firstNameModal');
    inp_lastName = $('#lastNameModal');
    inp_email = $('#emailModal');
    inp_avatar = $('#inputFileToLoad');
    //view mod//
    if (Mood === 'view') {
        inp_avatar.prop("disabled", true);
        inp_id.prop("disabled", true);
        inp_firstName.prop("disabled", true);
        inp_lastName.prop("disabled", true);
        inp_email.prop("disabled", true);
        btn_done.prop("disabled", true);
        btn_remove.prop("disabled", false);
        btn_edit.prop("disabled", false);
    }
    //rdit mod//
    if (Mood === 'edit') {
        inp_avatar.prop("disabled", false);
        inp_id.prop("disabled", true);
        inp_firstName.prop("disabled", false);
        inp_lastName.prop("disabled", false);
        inp_email.prop("disabled", false);
        btn_done.prop("disabled", false);
        btn_remove.prop("disabled", true);
        btn_edit.prop("disabled", true);
    }
    //add mod//
    if (Mood === 'add') {
        inp_avatar.prop("disabled", false);
        inp_id.prop("disabled", false);
        inp_firstName.prop("disabled", false);
        inp_lastName.prop("disabled", false);
        inp_email.prop("disabled", false);
        btn_remove.prop("disabled", true);
        btn_edit.prop("disabled", true);
        btn_done.prop("disabled", false);
    }
}

// toester that show help//
function toester(text, color, textColor) {
    // Get the snackbar DIV
    $("#snackbar").css(' background-color', color);
    $("#snackbar").css('color', textColor);
    $("#snackbar").text(text);
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


//function to triger input file for image //
function addImg() {
    $('#inputFileToLoad').trigger('click');
}

//convert image to base64 and use in avatr//
function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            document.getElementById("imgModal").src = srcData;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}