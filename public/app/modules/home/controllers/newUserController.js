/**
 * Created by Jayant on 29-03-2016.
 */
angular.module('home').controller('newUserController', newUserController);

function newUserController($state, userService){
    var vm = this;
    vm.saveUser = function(user){
        //add new user
        userService.users.push(user);
        $state.go('dash.users');

    };
}