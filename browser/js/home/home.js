app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
		controller: 'HomeCtrl',
		resolve: {
			getAllZones: function (ZoneFactory){
				return ZoneFactory.getAll();
			},
			getAllUsers: function (UserFactory){
				return UserFactory.getAll();
			},
			getAllCameras: function (CameraFactory){
				return CameraFactory.getAll();
			}
		}
    });
});

app.controller('HomeCtrl', function($scope, getAllZones, getAllUsers, getAllCameras, ZoneFactory){
	$scope.zones = getAllZones;
	$scope.users = getAllUsers;
	$scope.cameras = getAllCameras;

	$scope.submitted = false;

	$scope.checkPlate = function(plate, zoneId){
		$scope.submitted = true;
		console.log(plate, zoneId);
		return ZoneFactory.checkPlate(plate, zoneId)
		.then(function(response){
			console.log(response);
			$scope.access = response;
		});
	};
});
