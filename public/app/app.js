/**
 * Created by Jayant on 17-03-2016.
 */
//main module

'use strict';

var app = angular.module('myApp' ,['ui.router', 'login', 'home', 'admin']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider){
   $urlRouterProvider.otherwise('/login');
   // for cross origin request
   $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
});
// App constants here
app.constant('appConstants',{
   baseUrl:'http://localhost:3000'
});