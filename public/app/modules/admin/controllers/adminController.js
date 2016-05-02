/**
 * Created by Jayant on 09-04-2016.
 */
angular.module('admin').controller('adminController', adminController);

function adminController(userService, roomsService, accountsService, teamService){
    var vm = this;

    function resolvePromise(){
        userService.getUsers().then(function(data){
            vm.users = data;
        });

        roomsService.getRooms().then(function(data){
            vm.rooms = data;
        });

        accountsService.getAccounts().then(function(data){
           vm.accounts = data;
        });

        teamService.getTeams().then(function(data){
            vm.teams = data;
        });
    }
    resolvePromise();
}
