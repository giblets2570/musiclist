class Album {
	constructor(entity){
		angular.extend(this,entity);
		angular.extend(this.__proto__,entity.__proto__);
	}
	toggle(){
		this.$update();
	}
}

class AppCtrl {
	constructor($scope,$resource){
		let resource = $resource('/albums/:id', {id:'@id'}, {'update': {method:'PUT'}});
		let albums = resource.query();
		albums.$promise.then(() => {
			$scope.albums = albums.map((album) => new Album(album));
		})
	}
}

angular
	.module("app",["ngResource"])
	.controller("AppCtrl",AppCtrl);