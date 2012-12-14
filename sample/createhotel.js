var riakClient = require("riak-js").getClient({host: "localhost", port:"10018", api:"http"});// = require("riak")
var poolModule = require("generic-pool");

var client;
var styles = ['single', 'double', 'queen', 'king', 'suite'];

console.log("configure riakclient");

var instrument = {
	/*'riak.request.start': function(event){
		console.log("[riak-js]" + event.method.toUpperCase() + " " + event.path);
	},*/
	'riak.request.finish': function(event){
		console.log("[riak-js]" + event.method.toUpperCase() + " " + event.path);
	},
	'riak.request.end': function(event){
		console.log("[riak-js]" + event.method.toUpperCase() + " " + event.path);
	}
}

riakClient.registerListener(instrument);

/*
var pool = poolModule.Pool({
	name: "riak",
	create: function(callback){
		var client = new riakClient(
			["localhost:10018", "localhost:10028", "localhost:10038", "localhost:10048"], 
			"hotel-sample-client", 
			"hotel-sample-pool");
		callback(null, client);
	},
	
	destroy: function(client){client.end()},
	max:	1,
	min: 0,
	idleTimeoutMillis: 30000,
	log:true
});
*/

var bucket = "rooms";
//riakClient.saveBucket(bucket, {search: true});

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
		
		var data = {'style': roomStyle, 'capacity': capacity};
		console.log("RoomKey %d with %s"
			.replace("%d",roomKey)
			.replace("%s", JSON.stringify(data)));
		
		doSave(bucket, roomKey, data);
		
		/*
		pool.acquire(function(err, client){
			if(!err){
				client.put(bucket, roomKey, JSON.stringify(data), {}, function(err, res, obj){
					
				});
				pool.release(client);
			}
		});
		*/
	}
}

function doSave(bucket, roomKey, data){
	riakClient.save(bucket, roomKey, data, function(error){
		if(error != null){
			console.log(error);
		}
		else{
			riakClient.get(bucket, roomKey, function(err, data, meta){
				console.log("room: " + sys.inspect(data));	
			});
		}
	});
}
//riakClient.keys(bucket, { keys: 'stream' }).on('keys', console.dir).start();


console.log("exiting");
process.exit();
