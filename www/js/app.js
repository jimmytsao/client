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
      $scope.takePicture = takePicture;
    });

    function takePicture(){
      
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 1500,
        targetHeight: 1500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var sourceCoordinates;

        $scope.dataUrl = imageData;
        loadImgToCanvas('photo', $scope.dataUrl, 1125, 1500);

        sourceCoordinates = calculateSourceImageCoordinates(1500, 1125, 0.2, 0.3);
        loadCroppedCanvas('photo', sourceCoordinates, 'result');
      }, function(err) {
        // error
        console.log('ERROR: ', err);
      });      
    }

    function loadImgToCanvas(canvasId, dataUrl, width, height){
      var canvas = document.getElementById(canvasId);
      var context = canvas.getContext('2d');
      var img = new Image();

      canvas.width = width;
      canvas.height = height;

      img.onload = function drawImageToCanvas(){
        context.drawImage(img,0,0);
      };

      img.src = 'data:image/jpeg;base64,' + dataUrl;
    }

    function calculateSourceImageCoordinates(canvasHeight, canvasWidth, topPercent, heightPercent){
      var source = {
        x: 0,
        y: canvasHeight * topPercent,
        width: canvasWidth,
        height: canvasHeight * heightPercent
      };

      return source;
    }

    function loadCroppedCanvas(sourceId, sourceCoordinates, destinationId){
      var source = document.getElementById(sourceId);
      var cropped = document.getElementById(destinationId);
      var croppedContext = cropped.getContext('2d');
      var img = new Image();

      cropped.width = sourceCoordinates.width;
      cropped.height = sourceCoordinates.height;

      img.onload = function drawCroppedImageToCanvas(){
        console.log('Image Width and Height: ',this.width, this.height);
        console.log('Data: ', JSON.stringify(sourceCoordinates));
        croppedContext.drawImage(img, sourceCoordinates.x, sourceCoordinates.y, sourceCoordinates.width, sourceCoordinates.height, 0, 0, sourceCoordinates.width, sourceCoordinates.height);
      };

      img.src = 'data:image/jpeg;base64,' + $scope.dataUrl;
    }
  });
