var nodeRiakClient = require("riak")
var sys = require("sys");

var client;
var styles = ['single', 'double', 'queen', 'king', 'suite'];

console.log("configure riakclient");

//setup node riak client
var client = new nodeRiakClient(
			["127.0.0.1:10018"], 
			"hotel-sample-client", 
			"hotel-sample-pool");
client.debug_mode = true;

//save using node riak
function doSave(bucket, roomKey, data)
{
	console.log("saving with node riak");
	client.post("/riak/" + bucket + "/" + roomKey, data, function(err, res, obj){
			console.log("location: " + res.headers.location);
		});
}

var bucket = "rooms";

//Create 100 floors in the building
var max = 10;
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
		
		var data = {'style': roomStyle, 'capacity': capacity};
		console.log("RoomKey %d with %s"
			.replace("%d",roomKey)
			.replace("%s", JSON.stringify(data)));
		
		doSave(bucket, roomKey, data);
	}
}

console.log("exiting");
process.exit();
