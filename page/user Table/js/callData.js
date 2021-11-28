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


