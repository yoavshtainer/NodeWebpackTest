var connectors = require('./connectIndex');
var Mongo = connectors.Mongo;
var o_id = require('mongodb').ObjectID;
var log = require('minilog')('user.dal');
// Mongo.connect();
// log.info('is connected', Mongo.isConnected);

class user {
  static get colName() {
    return 'users';
  }

  static add(users, collectionName = 'users') {
    var col = Mongo.collection(collectionName);
    col.insert(users, function(){
			console.log("Successfully inserted " + users.email);
		});
  }

  static addOne(user, collectionName = 'users') {
    var col = Mongo.collection(collectionName);
    col.insertOne(user);
  }

  static getuserByid(userid, collectionName = 'users') {
    var col = Mongo.collection(collectionName);
  return  col.findOne({'local.username' : userid.toString()});
  }

  static getuserBy_id(userid, collectionName = 'users') {
    var col = Mongo.collection(collectionName);
    // console.log("_id: " + userid);
  return  col.findOne({'_id' :new o_id(userid)});
  }

 static getLength(user, collectionName = 'users') {
  var col = Mongo.collection(collectionName);
  var count;
  col.find({}).toArray().then( function(users){
    count = users.length;
					if(users.length == 0){         
							console.log("no user");
              user.add(user,"users");
					}else{
							console.log("found "+ (users.length) +" users" );  
              var count = 0;
              users.forEach(function(element) {
                  console.log("element number: " + count + " id: " + element.id);
                  console.log("name: "+ element.name);
                  console.log("status: "+ element.status);
                  count++;
              });         
					}
          console.log(count);
  return count;
			})
}

static getBuildingByName(buildingName, collectionName = 'users') {
    var col = Mongo.collection(collectionName);
    return col.findOne({ name: buildingName });
  }

}


module.exports.user = user;
