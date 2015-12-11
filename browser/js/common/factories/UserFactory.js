app.factory('UserFactory', function ($http) {

	var User = function(props){
		angular.extend(this, props);
	};
	// function getUser(username){
	// 	return $http.get('/users', function(response){
	// 		return response.data;
	// 	});
	// }

	User.getAll = function(){
		console.log('in get all users in factory');

		return $http.get('/api/users')
		.then(function(res){
			return res.data;
		});
	};
    return User;
});
