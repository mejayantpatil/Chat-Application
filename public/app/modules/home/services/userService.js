/**
 * Created by Jayant on 29-03-2016.
 */
angular.module('home').factory('userService', userService);

function userService($http, $q, appConstants){
    var service = {};
    var deferred = {};
    //var loggedUser = {};
    var baseUrl = appConstants.baseUrl;
    service.setCurrentUser = function(user){
        //loggedUser = user;
        sessionStorage.setItem('currentUser',JSON.stringify(user));
    };
    service.getCurrentUser = function(){
        return JSON.parse(sessionStorage.getItem('currentUser'));
    };

    service.clearCurrentUser = function(){
        sessionStorage.clear();
    };
    service.saveUser = function(user){
        deferred = $q.defer();
        // save user api
        $http.post(baseUrl+'/users/save', user).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    service.getUser = function(id){
        deferred = $q.defer();
        // get user api
        $http.get(baseUrl+'/users/'+id).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    service.getUsers = function(){
        deferred = $q.defer();
        // get user api
        $http.get(baseUrl+'/users').success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    service.updateUser = function(user){
        deferred = $q.defer();
        // update user api
        $http.put(baseUrl+'/users/update/'+user._id, user).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    service.deleteUser = function(user){
        deferred = $q.defer();
        // delete user api
        $http.delete(baseUrl+'/users/delete/'+user._id).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    service.activateUser = function(user){
        deferred = $q.defer();
        // delete user api
        $http.put(baseUrl+'/users/activate/'+user._id).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.deActivateUser = function(user){
        deferred = $q.defer();
        // delete user api
        $http.put(baseUrl+'/users/deActivate/'+user._id).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    service.validateUser = function(user){
        deferred = $q.defer();
        // get user api
        $http.post(baseUrl+'/users/validate',user).success(function(res){
            deferred.resolve(res);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return service;
}