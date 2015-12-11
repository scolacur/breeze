app.factory('ZoneFactory', function ($http) {

	var Zone = function(props){
		angular.extend(this,props);
	};

	Zone.getAll = function(){
		console.log('in factory');
		return $http.get('/api/zones')
		.then(function(response){
			return response.data;
		});
	};

	Zone.checkPlate = function(plate, zoneId){
		console.log(plate);
		return $http.get('/api/zones/'+zoneId+'/'+plate)
		.then(function(response){
			return response.data;
		});
	};

	return Zone;
});
