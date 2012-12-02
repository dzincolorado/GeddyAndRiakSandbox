var riakClient = require("riak"), client;
var styles = ['single', 'double', 'queen', 'king', 'suite'];

console.log("configure riakclient");
var client = new riakClient(
		["localhost:10018", "localhost:10028", "localhost:10038", "localhost:10048"], 
		"hotel-sample-client", 
		"hotel-sample-pool");

var bucket = "rooms";

//Create 100 floors in the building
var max = 100;
for(var floor = 1 ; floor < max; floor++){
	var current_rooms_block = floor * 100;
	
	console.log("Making rooms %d - %d1"
		.replace("%d", current_rooms_block)
		.replace("%d1", current_rooms_block + 100)
	);
	
	//put 100 on each floor
	for(var room = 1; room < max; room++){
		//unique room number as key
		var roomKey = current_rooms_block + room;
		//random room style
		var roomStyle = styles[Math.floor((Math.random() * 100)) % (styles.length)];
		//set capacity
		var capacity = (Math.floor((Math.random() * 100)) % 8) + 1
		
		//store room as JSON
		
		var data = {"style": roomStyle, "capacity": capacity};
		console.log("RoomKey %d with %s"
			.replace("%d",roomKey)
			.replace("%s", JSON.stringify(data)));
		
		client.put(bucket, roomKey, JSON.stringify(data), {}, function(err, res, obj){
			
		});
	}
}

console.log("exiting");
process.exit();
