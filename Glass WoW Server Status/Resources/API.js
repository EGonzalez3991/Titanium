var url = "http://us.battle.net/api/wow/realm/status";
var tableData = [];
var json, realms, type, i, row, serverLabel, typeLabel;


var xhr = Ti.Network.createHTTPClient({
	onload : function() {
		json = JSON.parse(this.responseText);
		for ( i = 0; i < json.realms.length; i++) {
			realms = json.realms[i];
			var row = Ti.UI.createTableViewRow({
				height : '60dp',
				realmText: realms.name,
				realmPop: realms.population,
				realmque: realms.queue,
				realmbg: realms.battlegroup,
				realmloc: realms.locale,
				realmtime: realms.timezone,
				realmOnline: realms.status,
				realmwint: realms.wintergrasp['controlling-faction'],
				realmtol: realms['tol-barad']['controlling-faction']
			});		
			var serverLabel = Ti.UI.createLabel({
				text : realms.name,
				font : {
					fontStyle: 'Roboto',
					fontSize : '24dp',
					fontWeight : 'bold'
				},
				height : 'auto',
				left : '10dp',
				top : '5dp',
				color : 'white',
				touchEnabled : false
			});
			var typeLabel = Ti.UI.createLabel({
				text : '"' + realms.type + '"',
				font : {
					fontStyle: 'Roboto',
					fontSize : '16dp'
				},
				height : 'auto',
				left : '15dp',
				bottom : '5dp',
				color : 'white',
				touchEnabled : false
			});
			var statusLabel = Ti.UI.createLabel({
				right: 10,
				touchEnabled: false
				
			});
			if (realms.status === true) {
					statusLabel.text = 'Online';
					statusLabel.color = "green";
				}else{
					statusLabel.text = 'Offline';
					statusLabel.color = "red";
				};
			
				
				
			
		
		
			row.add(statusLabel);
			row.add(serverLabel);
			row.add(typeLabel);
			tableData.push(row);
			

		}
		
		
		table.addEventListener('click', function(e) {
			var servWin = Ti.UI.createWindow();
			var realmlabel = Ti.UI.createLabel({
				text : e.source.realmText,
						font : {
							fontStyle: 'Roboto',
							fontSize : '24dp',
							fontWeight : 'bold'
						},
						height : 'auto',
						top: 10,
						left : 10,
						color : 'white',
						touchEnabled : false
			});
			if (e.source.realmOnline === true) {
				e.source.realmOnline = 'Online';
			}else{
				e.source.realmOnline = 'Offline';
			}
			var realmOnline = Ti.UI.createLabel({
				text : e.source.realmOnline,
						font : {
							fontStyle: 'Roboto',
							fontSize : '24dp',
							fontWeight : 'bold'
						},
						height : 'auto',
						top: 10,
						right : 10,
						touchEnabled : false
			
			});
			if (e.source.realmwint === '0'){
				e.source.realmwint = 'Horde';
			}else{
				e.source.realmwint = 'Alliance';
			};
			if (e.source.realmtol === '0'){
				e.source.realmtol = 'Horde';
			}else{
				e.source.realmtol = 'Alliance';
			};
			var realminfo = Ti.UI.createLabel({
				text: 'population: ' + e.source.realmPop + '\nqueue: '  + e.source.realmque + '\nbattlegroup: ' + e.source.realmbg + '\nlocale: ' + e.source.realmloc + '\ntimezone: ' + e.source.realmtime + '\nwintergrasp control: ' + e.source.realmwint + '\ntol-barad control: ' + e.source.realmtol,
					font: {
						fontStyle: 'Roboto',
						fontSize: '20dp',
					},
					height: 'auto',
					top: 55,
					left: 10,
					color: 'white',
					touchEnabled : false
			});

			servWin.add(realmlabel);
			servWin.add(realminfo);
			servWin.add(realmOnline);
			servWin.open();
		});
		
				
		
		
		
		table.setData(tableData);
	},
	onerror : function(e) {
		Ti.API.debug("STATUS: " + this.status);
		Ti.API.debug("TEXT: " + this.responseText);
		Ti.API.debug("ERROR: " + e.error);
		alert('Glass Online?\nThere was an error retrieving the remote data.');
	},
	timeout : 5000
});


xhr.open("GET", url);
xhr.send();


exports.data = xhr;
