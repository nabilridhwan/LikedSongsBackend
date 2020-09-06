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