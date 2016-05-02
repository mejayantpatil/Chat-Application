/**
 * Created by Jayant on 10-04-2016.
 */
angular.module('admin').factory('teamService', teamService);

function teamService($http, $q, appConstants){
    var service = {};
    var deferred = {};
    var baseUrl = appConstants.baseUrl;

    service.getTeams = function(){
        deferred = $q.defer();
        $http.get(baseUrl+'/teams').success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.saveTeam = function(team){
        deferred = $q.defer();
        $http.post(baseUrl+'/teams/save', team).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.deleteTeam = function(teamId){
        deferred = $q.defer();
        $http.delete(baseUrl+'/teams/delete/'+teamId).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return service;
}