/**
 * Created by Jayant on 31-03-2016.
 */

'use strict';
angular.module('home').controller('accountController', accountController);

function accountController($state, accountsService) {
    var vm = this;
    vm.accounts = [];

    vm.saveAccount = function (account) {
        accountsService.saveAccount(account).then(function(res){
            $state.go('dash.accounts');
        });
    };

    vm.deleteAccount = function (accountId) {
        accountsService.deleteAccount(accountId).then(function(res){
            vm.accounts = res;
        });
    };

    function initialize() {
        accountsService.getAccounts().then(function (data) {
            vm.accounts = data;
        });
    }

    initialize();
}