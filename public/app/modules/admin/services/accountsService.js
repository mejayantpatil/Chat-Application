/**
 * Created by Jayant on 09-04-2016.
 */
angular.module('admin').factory('accountsService', accountsService);

function accountsService($http, $q, appConstants){
    var service = {};
    var baseUrl = appConstants.baseUrl;
    var deferred = $q.defer();
    service.getAccounts = function(){
        deferred = $q.defer();
        $http.get(baseUrl+'/accounts').success(function(res){
            deferred.resolve(res);
        }).error(function(res){
            deferred.reject(res);
        });
        return deferred.promise;
    };
    //to save account here
    service.saveAccount = function(account){
        deferred = $q.defer();
        $http.post(baseUrl+'/accounts/save',account).success(function(res){
            deferred.resolve(res);
        }).error(function(res){
            deferred.reject(res);
        });
        return deferred.promise;
    };

    // delete account
    service.deleteAccount = function(accountId){
        deferred = $q.defer();
        $http.delete(baseUrl+'/accounts/delete/'+accountId).success(function(res){
            deferred.resolve(res);
        }).error(function(res){
            deferred.reject(res);
        });
        return deferred.promise;
    };
    return service;
}