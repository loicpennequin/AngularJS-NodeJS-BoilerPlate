angular.module('app')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('sampleState', {
        url: "/",
        component: "app"
      });
  });
