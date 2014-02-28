Ti.UI.backgroundColor = 'white';
var myData = require('API');

var win = Ti.UI.createWindow();



var table = Ti.UI.createTableView({
	headerTitle: 'WoW server status',
	width: "auto",
	height: "auto",
	separatorColor : 'white',
	allowsSelection: false,
	top: 0,

});







win.add(table);
win.open();