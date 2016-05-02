/**
 * Created by Jayant on 17-03-2016.
 */
'use strict';
var app = angular.module('home', []);

app.config(function($stateProvider){
    $stateProvider.state('dash',{
        url:'/dash',
        templateUrl:'modules/home/views/dash.html'
    });
    $stateProvider.state('dash.home',{
        url:'/home',
        templateUrl:'modules/home/views/home.html'
    });

    $stateProvider.state('home',{
        url:'/home',
        templateUrl:'modules/home/views/home.html',
        controller:'homeController',
        controllerAs:'vm'
    });
    $stateProvider.state('home.main',{
        url:'/main',
        templateUrl:'modules/home/views/main.html',
        controller:'mainController',
        controllerAs:'vm'
    });
    $stateProvider.state('home.profile',{
        url:'/profile',
        templateUrl:'modules/home/views/profile.html',
        controller:'mainController',
        controllerAs:'vm'
    });
});
