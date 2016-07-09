function mapHelper() {
"use strict";
    function placeWindow(name, image) {
      return '<div class="info_content">' +
        '<h3>' + name + '</h3>' +
        '<img src="' + image + '"></div>';
    }

    function prepareMarkers(placesArray, location){
      return placesArray.map(function(element){
        return [element.name + ', ' + location , element.coordinate[0] , element.coordinate[1], element._id];
      });
    }
    function prepareWindows(placesArray){
      return placesArray.map(function(element){
        return placeWindow(element.name, element.main_photo.min_url);
      });
    }
    function findElementToHighlight(arrayLikeObject, name){
      console.log(typeof arrayLikeObject,  name.title, arrayLikeObject[0]);
      // for(var object in arrayLikeObject){
      //   if(arrayLikeObject[object].getAttribute('data-name') === name.title.slice(',').slice(0,1).toString()){
      //     return arrayLikeObject[object];
      //   }
      // }
      // array = Array.prototype.some.apply(this, array);
      // array.some(function(el){
      //   console.log(el);
      // });
      // return
      //   .some(function(element){
      //   console.log(element, name);
      //   return element;
      // });
    }

    return {
      prepareMarkers: prepareMarkers,
      prepareWindows: prepareWindows,
      findElementToHighlight: findElementToHighlight
    };
}
angular.module('maps').factory('mapHelper', [mapHelper]);
