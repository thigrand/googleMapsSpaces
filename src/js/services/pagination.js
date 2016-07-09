function paginationService() {
"use strict";
    function initPagination(paginationObj){
      var initialPagination = {
        spacesPerPage: 0
      };
      initialPagination.spacesAmount = paginationObj.all;
      initialPagination.pages = paginationObj.pages;
      initialPagination.spacesPerPage = (initialPagination.spacesAmount / initialPagination.pages) / 2;
      initialPagination.currentPage = 1;
      return initialPagination;
    }
    function changePage(paginationObj, direction){
      if(direction === 'next' && (paginationObj.pages > paginationObj.currentPage)){
        paginationObj.currentPage++;
      }
      if(direction === 'previous' && (paginationObj.currentPage > 1)){
        paginationObj.currentPage--;
      }
      return paginationObj;
    }
    return {
      initPagination: initPagination,
      changePage: changePage
    };
}
angular.module('maps').factory('paginationService', [paginationService]);
