var LocalStrategy = require('passport-local').Strategy;
var userDb = require("../user.dal").user;

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		console.log("user " + user.local.password + " password " + user._id);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done){
		console.log("id: " + id);
		userDb.getuserBy_id(id, 'users').then( function(user){
				console.log("sensor is: ", user);
				done(null, user);
					}), function(error){
			console.log("error is: ", error);
				done(null, error);
				};
	});

 
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		console.log("passport /signup");
		process.nextTick(function(){
			userDb.getuserByid(email, 'users').then( function(user){
				// console.log("user is: ", user);
				if(user){
					console.log("USER: ", user);
					return done(null, user);
				} else {
					var newUser = {
					username:	email,
					password: password
					}
					userDb.add({local: newUser},'users');
					return done(null, false);
					}
				}), function(error){
			console.log("error is: ", error);
			if(err)
						return done(err);
				};
			// User.findOne({'local.username': email}, function(err, user){

			// 	if(user){
			// 		return done(null, false, req.flash('signupMessage', 'That email already taken'));
			// 	} else {
			// 		var newUser = new User();
			// 		newUser.local.username = email;
			// 		newUser.local.password = password;

			// 		newUser.save(function(err){
			// 			if(err)
			// 				throw err;
			// 			return done(null, newUser);
			// 		})
			// 	}
			// })

		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
			process.nextTick(function(){
				console.log("passport /login");
				userDb.getuserByid(email, 'users').then( function(user){
				console.log("user is: ", user);
				if(!user)
						return done(null, false, req.flash('loginMessage', 'No User found'));
					if(user.local.password != password){
						return done(null, false, req.flash('loginMessage', 'inavalid password'));
					}
					return done(null, user);

					}), function(error){
			console.log("error is: ", error);
			if(err)
						return done(err);
				};
			});
		}
	));


};