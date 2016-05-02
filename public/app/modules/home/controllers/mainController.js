/**
 * Created by Jayant on 02-04-2016.
 */
angular.module('home').controller('mainController', mainController);

function mainController(userService, teamService, $compile, $scope, $state) {
    var vm = this;
    vm.users = [];
    vm.currentUser = {};
    vm.currentTeam = {};
    vm.isJoined = false;
    //socket io
    var socket = io.connect('http://localhost:3000', {port: 3000});
    //this variable represents the total number of popups can be displayed according to the viewport width
    var total_popups = 0;
    //arrays of popups ids
    var popups = [];

    // get all team here
    teamService.getTeams().then(function (data) {
        vm.teams = data;
    });

    // to join team
    vm.joinTeam = function (team) {
        //emit here
        vm.isJoined = true;
        vm.currentTeam = team;
        socket.emit('team:join', {teamName: team.teamName, user: vm.currentUser});
    };

    // to leave room
    vm.leaveTeam = function () {
        vm.isJoined = false;
        socket.emit('team:leave', {teamName: vm.currentTeam.teamName, user: vm.currentUser});
    };

    // to handle disconnect event on logut
    vm.logout = function(){
        socket.disconnect(vm.currentUser);
        $state.go('logout');
    };

    //send team message
    vm.sendTeamMessage = function () {

        socket.emit('from:team message', {user: vm.currentUser, team: vm.currentTeam, message: vm.teamMessage});
        vm.teamMessage = '';
        angular.element('#btn-input').val('');
        angular.element('#btn-input').focus('');
    };

    function getUsers() {
        userService.getUsers().then(function (data) {
            vm.users = data;
        });
        vm.currentUser = userService.getCurrentUser();
        socket.emit('init', vm.currentUser);
    }

    getUsers();

    vm.register_popup = function (id, name) {
        register_popup(id.replace(/[@.]/gi, '_'), name);
    }
    vm.sendMessage = function (id) {
        sendMessage(id);
    }

    vm.close_popup = function (id) {
        close_popup(id);
    };
    //this function can remove a array element.
    Array.remove = function (array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };

    //this is used to close a popup
    function close_popup(id) {
        for (var iii = 0; iii < popups.length; iii++) {
            if (id == popups[iii]) {
                Array.remove(popups, iii);

                document.getElementById(id).style.display = "none";

                $('#' + id + ' .popup-head').unbind("click");
                calculate_popups();

                return;
            }
        }
    }

    //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
    function display_popups() {
        var right = 220;

        var iii = 0;
        for (iii; iii < total_popups; iii++) {
            if (popups[iii] != undefined) {
                var element = document.getElementById(popups[iii]);
                element.style.right = right + "px";
                right = right + 320;
                element.style.display = "block";
            }
        }

        for (var jjj = iii; jjj < popups.length; jjj++) {
            var element = document.getElementById(popups[jjj]);
            element.style.display = "none";
        }
    }

    //creates markup for a new popup. Adds the id to popups array.
    function register_popup(id, name) {
        for (var iii = 0; iii < popups.length; iii++) {
            //already registered. Bring it to front.
            if (id == popups[iii]) {
                Array.remove(popups, iii);

                popups.unshift(id);

                calculate_popups();


                return;
            }
        }

        var element = '<div class="popup-box chat-popup" id="' + id + '" >';
        element = element + '<div class="popup-head">';
        element = element + '<div class="popup-head-left">' + name + '</div>';
        element = element + '<div class="popup-head-right"><a href="javascript:void(0);" ng-click="vm.close_popup(\'' + id + '\')">&#10005;</a></div>';
        element = element + '<div style="clear: both"></div></div><div class="popup-messages"></div><div><textarea class="userinput" placeholder="Type here..."></textarea><button class="btn btn-primary btn-md pull-right" ng-click="vm.sendMessage(\'' + id + '\')">Send</button></div></div>';

        //document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;
        angular.element('#chatElement').append($compile(element)($scope));
        popups.unshift(id);

        calculate_popups();
        restore(id);
    }

    // header minimise handler
    function restore(id) {
        $('#' + id).css('height', '285px');
        var fixedBoxsize = $('#' + id).outerHeight() + 'px';
        var toggle = false;
        $('#' + id + ' .popup-head').click(function () {
            toggle = (!toggle) ? true : false;
            if (toggle) {
                $('#' + id).animate({'height': fixedBoxsize}, 300);
            }
            else {
                $('#' + id).animate({'height': '30px'}, 300);
            }

        });
        $('#' + id + ' .userinput').val('');
        $('#' + id + ' .userinput').focus();
    }

    // updating message in chat box
    function sendMessage(id) {
        var msg = $('#' + id + ' .userinput').val();
        socket.emit('from:private message', {to: id, message: msg});
        $('#' + id + ' .popup-messages').append("<div class='userwrap'><span class='user'>me:</span><span class='messages'>" + msg + "</span></div>");
        $('#' + id + ' .popup-messages').scrollTop($('#' + id + ' .popup-messages').height());
        $('#' + id + ' .userinput').val('');
        $('#' + id + ' .userinput').focus();

    }

    //calculate the total number of popups suitable and then populate the toatal_popups variable.
    function calculate_popups() {
        var width = window.innerWidth;
        if (width < 540) {
            total_popups = 0;
        }
        else {
            width = width - 200;
            //320 is width of a single popup box
            total_popups = parseInt(width / 320);
        }

        display_popups();

    }

    //recalculate when window is loaded and also when window is resized.
    window.addEventListener("resize", calculate_popups);
    window.addEventListener("load", calculate_popups);


    socket.on('to:private message', function (data) {
        vm.register_popup(data.from.email, data.from.firstName + ' ' + data.from.lastName);
        $('#' + data.from.email.replace(/[@.]/gi, '_') + ' .popup-messages').append("<div class='userwrap'><span class='user'>" + data.from.firstName + " " + data.from.lastName + ":</span><span class='messages'>" + data.message + "</span></div>");
        $('#' + data.from.email.replace(/[@.]/gi, '_') + ' .popup-messages').scrollTop($('#' + data.from.email.replace(/[@.]/gi, '_') + ' .popup-messages').height());
    });

    //to show online users
    socket.on('user:joined', function(data){
        var users = [];
        angular.forEach(vm.users, function(user, index){
            angular.forEach(data, function(value, email){
                if(user.email.replace(/[@.]/gi, '_') == email){
                    vm.users[index].online = true;
                }
            });
        });
        //TODO this may cause digest cycle error
        $scope.$apply();
    });
    // update user who logout
    socket.on('user:left', function(data){
        console.log('left event');
        angular.forEach(vm.users, function(user, index){
                if(user._id == data._id){
                    vm.users[index].online = false;
                }
        });
        //TODO this may cause digest cycle error
        $scope.$apply();
    });

    socket.on('to:team message', function (data) {
        if (vm.currentUser._id == data.user._id) {
            angular.element('#chatRoom').append('<li class="right clearfix"><span class="chat-img pull-right">' +
                '<img src="http://placehold.it/50/FA6F57/fff&text=ME" class="img-circle" />' +
                '</span>' +
                '<div class="chat-body clearfix">' +
                '<div class="header">' +
                '<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>0 mins ago</small>' +
                '<strong class="pull-right primary-font">' + data.user.firstName + ' ' + data.user.lastName + '</strong>' +
                '</div>' +
                '<p>' + data.message +
                '</p>' +
                '</div>' +
                '</li>');
        } else {
            angular.element('#chatRoom').append('<li class="left clearfix"><span class="chat-img pull-left">' +
                '<img src="http://placehold.it/50/55C1E7/fff&text=' + data.user.firstName.charAt(0) + '" alt="User Avatar" class="img-circle" />' +
                '</span>' +
                '<div class="chat-body clearfix">' +
                '<div class="header">' +
                '<strong class="primary-font">' + data.user.firstName + ' ' + data.user.lastName + '</strong>' +
                '<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>0 mins ago</small>' +
                '</div>' +
                '<p>' + data.message +
                '</p>' +
                '</div>' +
                '</li>');
        }
        $('#chatBox').scrollTop($('#chatBox').height());
        angular.element('#btn-input').val('');
        angular.element('#btn-input').focus('');
    });

    socket.on('user joined', function (data) {
        if (vm.currentUser._id != data.user._id) {
            angular.element('#chatRoom').append('<li class="left clearfix"><span class="chat-img pull-left">' +
                '<img src="http://placehold.it/50/55C1E7/fff&text=' + data.user.firstName.charAt(0) + '" alt="User Avatar" class="img-circle" />' +
                '</span>' +
                '<div class="chat-body clearfix">' +
                '<div class="header">' +
                '<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>0 mins ago</small>' +
                '<strong class="primary-font">' + data.user.firstName + ' ' + data.user.lastName + '</strong>' +
                '</div>' +
                '<p>User joined' +
                '</p>' +
                '</div>' +
                '</li>');
        }
        $('#chatBox').scrollTop($('#chatBox').height());
    });

    socket.on('user left', function (data) {
        if (vm.currentUser._id != data.user._id) {
            angular.element('#chatRoom').append('<li class="left clearfix"><span class="chat-img pull-left">' +
                '<img src="http://placehold.it/50/55C1E7/fff&text=' + data.user.firstName.charAt(0) + '" alt="User Avatar" class="img-circle" />' +
                '</span>' +
                '<div class="chat-body clearfix">' +
                '<div class="header">' +
                '<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>0 mins ago</small>' +
                '<strong class="primary-font">' + data.user.firstName + ' ' + data.user.lastName + '</strong>' +
                '</div>' +
                '<p>User has left' +
                '</p>' +
                '</div>' +
                '</li>');
        }
        $('#chatBox').scrollTop($('#chatBox').height());
    });

}