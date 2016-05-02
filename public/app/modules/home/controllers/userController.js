/**
 * Created by Jayant on 29-03-2016.
 */
angular.module('home').controller('userController', userController);

function userController(userService, $stateParams, $state, $filter, accountsService){
    var vm = this;
    vm.user = {};
    vm.editMode = false;
    vm.message= '';
    //get users
    function getUsers(){
        userService.getUsers().then(function(data){
            vm.users = data;
            vm.user = $stateParams.userId ? $filter('filter')(vm.users, function (d) {return d._id === $stateParams.userId;})[0]:{};
            vm.editMode = $stateParams.userId ? true:false;
        });
        accountsService.getAccounts().then(function (data) {
            vm.accounts = data;
        });

    }
    getUsers();

    vm.saveUser = function(user){
        userService.saveUser(user).then(function(data){
            vm.users = data;
            $state.go('dash.users');
        }).catch(function(err){
            vm.message = err;
        });
    };

    vm.updateUser = function(user){
        userService.updateUser(user).then(function(data){
            vm.users = data;
            $state.go('dash.users');
        });
    };

    vm.deleteUser = function(user){
        userService.deleteUser(user).then(function(data){
            vm.users = data;
        });
    };

    vm.activateUser = function(user){
        userService.activateUser(user).then(function(data){
            vm.users = data;
        });
    };

    vm.deActivateUser = function(user){
        userService.deActivateUser(user).then(function(data){
            vm.users = data;
        });
    };
}