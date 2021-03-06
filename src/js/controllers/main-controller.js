function MainController(apiConnector, mapHelper, paginationService, viewHelper) {
"use strict";
    var main = this;
    main.pagination = {};
    main.map = mapHelper.initMapProperties();
    main.spacesForView = [];
    main.highlight = 0;


    main.highlightSpace = function(id){
      return id === main.highlight ? true : false;
    };
    main.changePage = function(direction){
      main.pagination = paginationService.changePage(main.pagination, direction);
      main.reDrawMap();
    };
    main.reDrawMap = function(){
      main.spacesForView = takeSpacesForView();
      main.map.markers = mapHelper.prepareMarkers(main.spacesForView, main.map.localization.location);
      main.map.infoWindowContent = mapHelper.prepareWindows(main.spacesForView);
    };

    function takeSpacesForView( ){
      return main.map.spaces.slice((main.pagination.currentPage * 10)-1, (main.pagination.currentPage * 10) + 9);
    }

    apiConnector.fetchData("http://vsapi.ragnak.com/spaces?location=London,%20UK&center=51.5073509,-0.12775829999998223&bounds=51.4946346324718,-0.23350170820310723,51.520063619519604,-0.022014891796857228&page=1&is_mobile=null").then(function(response){
      main.map.spaces = response.data.data.spaces;
      main.pagination = paginationService.initPagination(response.data.data || {currentPage : 1});
      main.spacesForView = takeSpacesForView();
      main.map.markers = mapHelper.prepareMarkers(main.spacesForView, main.map.localization.location);
      main.map.infoWindowContent = mapHelper.prepareWindows(main.spacesForView);
    });
}
angular.module('maps').controller('MainController', ['apiConnector', 'mapHelper', 'paginationService', 'viewHelper', MainController]);
