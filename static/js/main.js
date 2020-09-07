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

    // All follows following format
    /*
        tagline: <user_country|song_artist>
        image: image of album or profile picture
        name: <track_name|display_name>
        type: <song|user>
        button_url: <user_link|song_link>
    */
    $http.get(`/api/getProfiles`).then((res) => {
        $scope.profiles = res.data.data;
        $scope.allLikedSongs = $scope.profiles.map(profile => profile.liked_songs)[0]
        $scope.allLikedSongsFormatted = $scope.allLikedSongs.map(song => {
            return{
                image: song.track.album.images[0].url,
                type: "Track",
                name: song.track.name,
                tagline: song.track.artists[0].name,
                button_url: song.track.external_urls.spotify
            }
        })

        // TODO: Update with button url of user profile
        $scope.allProfilesFormatted = $scope.profiles.map(profile => {
            return {
                image: profile.image,
                type: "User",
                name: profile.name,
                tagline: profile.spotifyCountry,
                button_url: "#"
            }
        })
        $scope.searchData = $scope.allLikedSongsFormatted.concat($scope.allProfilesFormatted)
    })
})