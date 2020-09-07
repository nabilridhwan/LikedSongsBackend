let mainApp = angular.module('mainApp', []);
mainApp.controller('HomeController', ($scope, $http) => {
    $http.get("/api/getRedirectLink").then((res) => {
        $scope.redirectLink = res.data.data
    })
})

mainApp.controller('ProfileController', ($scope, $http) => {
    $http.get(`/api/getProfiles`).then((res) => {
        $scope.profiles = res.data.data;
    })
})

mainApp.controller('SearchController', ($scope, $http) => {
    $http.get(`/api/getProfiles`).then((res) => {
        $scope.profiles = res.data.data;

        $scope.allLikedSongs = $scope.profiles.map(profile => profile.liked_songs)[0]
        console.log($scope)
    })
})