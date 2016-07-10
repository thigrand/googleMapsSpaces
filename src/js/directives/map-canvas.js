function mapCanvas(mapHelper) {
"use strict";
    return {
        restrict: 'E',
        replace: true,
        scope:{
            mapProperties: '=mapProperties',
            highlight:'=highlight',
        },
        link: function(scope, element, attrs) {
            var listOfDisplayedPlaces = [];
            var markersToDraw = [];
            var existsMarkers = [];
            var myOptions = {
                center: new google.maps.LatLng(scope.mapProperties.localization.center.latitude, scope.mapProperties.localization.center.longitude),
            };
            var bounds = new google.maps.LatLngBounds();
            var boundA = new google.maps.LatLng(scope.mapProperties.localization.boundA.latitude, scope.mapProperties.localization.boundA.longitude);
            var boundB = new google.maps.LatLng(scope.mapProperties.localization.boundB.latitude, scope.mapProperties.localization.boundB.longitude);
            var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
            setDefaultBounds();
            var infoWindow = new google.maps.InfoWindow(), marker, i;

            // Loop through our array of markers & place each one on the map
            scope.$watchGroup(['mapProperties.markers', 'mapProperties.infoWindowContent'], function(markers) {
              markersToDraw = markers;
              //markers[0] - markers location
              //markers[1] - markers popup window
              clearMarkers();
                for( i = 0; i < markers[0].length; i++ ) {
                    var position = new google.maps.LatLng(markersToDraw[0][i][1], markersToDraw[0][i][2]);
                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: markersToDraw[0][i][0],
                        id: markersToDraw[0][i][3]
                    });
                    bounds.extend(position);
                    map.fitBounds(bounds);
                    // Allow each marker to have an info window
                    google.maps.event.addListener(marker, 'mouseover', infoForMarkers(marker, i, markersToDraw[1]));
                    existsMarkers.push(marker);
                }
            }, true);//deep watch

            function infoForMarkers(marker, i, infoWindowContent){
              return function() {
                  scope.highlight = marker.id;
                  infoWindow.setContent(infoWindowContent[i]);
                  infoWindow.open(map, marker);
                  scope.$applyAsync();
              };
            }

            function clearMarkers() {
              setMapOnAll(null);
              setDefaultBounds();
            }
            function setMapOnAll(map) {
              for (var i = 0; i < existsMarkers.length; i++) {
                existsMarkers[i].setMap(map);
              }
            }
            function setDefaultBounds() {
              bounds = new google.maps.LatLngBounds();
              bounds.extend(boundA);
              bounds.extend(boundB);
              map.fitBounds(bounds);
            }
        }
    };
}
angular.module('maps').directive('mapCanvas', ['mapHelper', mapCanvas]);
