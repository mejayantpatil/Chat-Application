/**
 * Created by Jayant on 10-04-2016.
 */
'use strict';
angular.module('admin').controller('roomController', roomController);

function roomController(roomsService, $state){
    var vm = this;

    vm.deleteRoom = function(roomId){
      roomsService.deleteRoom(roomId).then(function(res){
         vm.rooms = res;
      });
    };

    vm.saveRoom = function(room){
      roomsService.saveRoom(room).then(function(res){
          vm.rooms = res;
          $state.go('dash.rooms');
      });
    };
    function getRooms(){
        roomsService.getRooms().then(function(res){
            vm.rooms = res;
        });
    }

    getRooms();
}