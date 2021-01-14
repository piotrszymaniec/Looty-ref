
var __leagueService = {
SaveLeague: function() {
var league = $('#league-selector').val();
localStorage.setItem('poe-league', league);
$('#league-dialog').modal('hide');
},
OpenLeagueDialogue: function() {
var league = localStorage.getItem('poe-league');
if(league) {
$('#league-selector').val(league);
}
$('#league-dialog').modal('show');
}
};
var __themeController = {
applyTheme: function(theme) {
switch(theme) {
case "light":
default:
var cls = "";
_.forEach(document.body.classList, function(s) {
if(!s.startsWith("pc-theme-")) {
cls += " " + s;
}
});
document.body.className = cls;
break;
case "dark":
document.body.className = "pc-theme-dark";
break;
}
},
setTheme: function(theme) {
localStorage.setItem('theme', theme);
__themeController.applyTheme(theme);
}
};
__themeController.applyTheme(localStorage.getItem('theme') || 'light');
