/**
 * Created by Jayant on 17-03-2016.
 */
'use strict';
var app = angular.module('login', []);

app.config(function($stateProvider){

    $stateProvider.state('login',{
        url:'/login',
        templateUrl:'modules/login/views/login.html',
        controller:'loginController',
        controllerAs:'vm'
    });
    $stateProvider.state('logout',{
        url:'/logout',
        templateUrl:'modules/login/views/login.html',
        resolve:{
            logout:function(userService){
                userService.clearCurrentUser();
            }
        },
        controller:'loginController',
        controllerAs:'vm'
    });
    $stateProvider.state('register',{
        url:'/register',
        templateUrl:'modules/login/views/register.html'
    });
});