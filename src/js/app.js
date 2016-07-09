'use strict';

angular.module('maps', [])
.config(function ($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
});
