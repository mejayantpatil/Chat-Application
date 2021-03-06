/**
 * Created by Jayant on 17-03-2016.
 */
'use strict';
var app = angular.module('admin', ['checklist-model']);

app.config(function($stateProvider){
    $stateProvider.state('dash.admin',{
        url:'/admin',
        templateUrl:'modules/admin/views/admin.html',
        controller:'adminController',
        controllerAs:'vm'
    });
    $stateProvider.state('dash.accounts',{
        url:'/accounts',
        templateUrl:'modules/home/views/accounts.html',
        controller:'accountController',
        controllerAs:'vm'
    });
    $stateProvider.state('dash.newAccount',{
        url:'/account/new',
        templateUrl:'modules/home/views/newAccount.html',
        controller:'accountController',
        controllerAs:'vm'
    });
    $stateProvider.state('dash.newUser',{
        url:'/newUser',
        templateUrl:'modules/home/views/newUser.html',
        controller:'userController',
        controllerAs:'vm'
    });

    $stateProvider.state('dash.editUser',{
        url:'/user/edit/:userId',
        templateUrl:'modules/home/views/newUser.html',
        controller:'userController',
        controllerAs:'vm'
    });
    $stateProvider.state('dash.users',{
        url:'/users',
        templateUrl:'modules/home/views/users.html',
        controller:'userController',
        controllerAs:'vm'
    });
    $stateProvider.state('dash.invite',{
        url:'/invite',
        templateUrl:'modules/home/views/invite.html'
    });
    $stateProvider.state('dash.rooms',{
        url:'/rooms',
        templateUrl:'modules/admin/views/rooms.html',
        controller:'roomController',
        controllerAs:'vm'
    });
    $stateProvider.state('dash.newRoom',{
        url:'/rooms/new',
        templateUrl:'modules/admin/views/newRoom.html',
        controller:'roomController',
        controllerAs:'vm'
    });
    $stateProvider.state('dash.teams',{
        url:'/teams',
        templateUrl:'modules/admin/views/teams.html',
        controller:'teamController',
        controllerAs:'vm'
    });
    $stateProvider.state('dash.newTeam',{
        url:'/teams/new',
        templateUrl:'modules/admin/views/newTeam.html',
        controller:'teamController',
        controllerAs:'vm'
    });
});