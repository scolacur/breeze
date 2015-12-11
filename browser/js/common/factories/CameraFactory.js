app.factory('CameraFactory', function ($http) {

	var Camera = function(props){
		angular.extend(this, props);
	};

	Camera.getAll = function(){
		console.log('in Camera factory');
		return $http.get('/api/cameras')
		.then(function(response){
			return response.data;
		});
	};
    return Camera;
});
