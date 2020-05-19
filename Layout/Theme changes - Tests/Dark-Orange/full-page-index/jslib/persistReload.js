
// uses JQuery
// This file introduces saving voletile html data lost during page reloads


var htmlElementsToSave = [];

// what to save :
//subpage buttons states
//Home, XP, Wealth, Maps, Standard, Hardcore, Settings, League ....

//text fields - header filter fields
//textFields

//Selected Columns buttons


//How?
//localStorage.setItem("save", "me!")

//localStorage.getItem("get", "me!")


//localStorage.setItem("buttonList", "me!")
// array
// we need to remember just those who are lit, so lets put just their names
// while retrieving we will set their class to "col-on"
// lets have other lists for column buttons
// activeColumns?
// and
// activeControl
// control panel buttons will have class "active"
// css  .active { background-color: green;}
var activeColumns = [];
//but how to connect column name and button in "Select Columns" panel which does not have name ?

//test
//all <a> with view-btn class
//if there is active control btn then lit it

//get active button control after reload
//var controllBtns = ['home','xp','wealth', 'maps', 'poebuilder', 'standard', 'hardcore', 'settings','otherleagues']
//

var activeControl = "";
if (( activeControl = localStorage.getItem("activeControl") || "" ) !=="") {
    let btnclass = "." + activeControl;
    $(btnclass).addClass("active");
}
//
var $buttons = $(".view-btn");
$buttons.on("click", function (){
    let btn = $(this);
    //clear all button from "active" class
    $buttons.each(function() {
        $(this).removeClass("active");
    });

    btn.removeClass("view-btn");
    //now remains class unique to button ... why we are not using id's instead of class ?
    localStorage.setItem("activeControl", btn.attr("class"));
    btn.addClass("view-btn");

    btn.addClass("active");
//
//    if (btn.hasClass("active")) {
//        localStorage.setItem("activeControl", "");
//    } else {
//        btn.removeClass("view-btn");
//        localStorage.setItem("activeControl", btn.attr("class"));
//        btn.addClass("view-btn");
//    }
//    //clear all previous
//    btn.toggleClass("active");
});
//WE HAVE TO add routing besides lighted button so: ...
//oh we dont, looty does that, but...
//we could check if url is .. nah

$(document).ready(function(){

})


// another list for column text fields - maybe remember name and value together
// Class Column {
//  columnGroup:String  //General
//  position:Int    //2
//  name:String     //rarity
// }
//  we would have to generate beforehand list of all Column objects
// maybe we will refactor button - column system altogether ???
// think about what model could work here better then
// <div> columnNameAlsoStatName</div> class on-col, off-col

var textfieldList = [];