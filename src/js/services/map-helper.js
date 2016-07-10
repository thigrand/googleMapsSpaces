function mapHelper() {
"use strict";
    function placeWindow(name, image) {
      return '<div class="info_content">' +
        '<h3>' + name + '</h3>' +
        '<img src="' + image + '"></div>';
    }

    function initMapProperties(){
      var map = {};
      map.localization = {
        center: {
          latitude: 51.5073509,
          longitude: -0.12775829999998223
        },
        location: 'london',
        boundA: {
          latitude: 51.46127765398595,
          longitude: -0.354007994824201
        },
        boundB: {
          latitude: 51.55337760399641,
          longitude: 0.09849139482423652
        },
      };
      map.spaces = [];
      map.markers = [];
      map.infoWindowContent = [];
      return map;
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

    return {
      prepareMarkers: prepareMarkers,
      prepareWindows: prepareWindows,
      initMapProperties: initMapProperties
    };
}
angular.module('maps').factory('mapHelper', [mapHelper]);
