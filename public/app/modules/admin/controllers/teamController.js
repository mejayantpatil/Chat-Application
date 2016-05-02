/**
 * Created by Jayant on 10-04-2016.
 */
angular.module('admin').controller('teamController', teamController);

function teamController($state, userService, roomsService, teamService){
    var vm = this;
    vm.teams = [];
    vm.selectedUsers = [];
    vm.selectAll = false;

    vm.checkAll = function(){
      if(vm.selectAll){
          vm.selectedUsers = angular.copy(vm.users);
      }else{
          vm.unCheckAll();
      }
    };

    vm.unCheckAll = function(){
        vm.selectedUsers = [];
    };

    vm.saveTeam = function(team){
        team.users = vm.selectedUsers;
        teamService.saveTeam(team).then(function(res){
           vm.message = 'Team created successfully';
           $state.go('dash.teams');
        });
    };

    vm.deleteTeam = function(teamId){
        teamService.deleteTeam(teamId).then(function(res){
            vm.teams = res;
        });
    };
    function resolvePromise(){
        teamService.getTeams().then(function(data){
            vm.teams = data;
        });

        userService.getUsers().then(function(data){
            vm.users = data;
        });

        roomsService.getRooms().then(function(data){
            vm.rooms = data;
        });
    }
    resolvePromise();
}