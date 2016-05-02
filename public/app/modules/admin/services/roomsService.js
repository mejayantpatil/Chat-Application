/**
 * Created by Jayant on 09-04-2016.
 */
'use strict';
angular.module('admin').factory('roomsService', roomsService);

function roomsService($http, $q, appConstants) {
    var service = {};
    var baseUrl = appConstants.baseUrl;
    var deferred = {};
    service.getRooms = function () {
        deferred = $q.defer();
        $http.get(baseUrl + '/rooms').success(function (res) {
            deferred.resolve(res);
        }).error(function (res) {
            deferred.reject(res);
        });
        return deferred.promise;
    };

    service.saveRoom = function(room){
        deferred = $q.defer();
        $http.post(baseUrl+'/rooms/save', room).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    }

    service.deleteRoom = function(roomId){
        deferred = $q.defer();
        $http.delete(baseUrl+'/rooms/delete/'+roomId).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    }
    return service;
}