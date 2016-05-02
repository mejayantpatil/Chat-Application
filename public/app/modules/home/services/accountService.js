/**
 * Created by Jayant on 31-03-2016.
 */

'use strict';

angular.module('home').factory('accountService', accountService);

function accountService(){
    var service = {};
    service.accounts = [];
    service.setAccount = function(account){
        service.accounts.push(account);
    }
    service.getAccounts = function(){
        return service.accounts;
    }

    return service;
}