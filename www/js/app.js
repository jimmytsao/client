'use strict';

angular
  .module('starter', [
    'ionic',
    'ngCordova'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('imageController', function($scope, $ionicPlatform, $cordovaCamera){

    $scope.dataUrl;

    $ionicPlatform.ready(function(){

      $scope.takePicture = function takePicture(){
        
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 1000,
          targetHeight: 1000,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.dataUrl = imageData;
        }, function(err) {
          // error
          console.log('ERROR: ', err);
        });      
      };
    });
  })
