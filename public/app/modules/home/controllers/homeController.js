/**
 * Created by Jayant on 08-04-2016.
 */
angular.module('home').controller('homeController', homeController);

function homeController(userService){
    var vm = this;
    vm.currentUser = {};
    function getUser(){
        vm.currentUser = userService.getCurrentUser();
    }
    getUser();
}