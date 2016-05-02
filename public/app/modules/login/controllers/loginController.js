/**
 * Created by Jayant on 31-03-2016.
 */
angular.module('login').controller('loginController', loginController);

function loginController($state, userService){
    var vm = this;
    vm.message = '';
    vm.login = function(user){

        if(user.username =='admin'){
            $state.go('dash.admin');
        }
        else{
            userService.validateUser(user).then(function(res){
                if(res.length) {
                    userService.setCurrentUser(res[0]);
                    $state.go('home.main');
                }
                else{
                    vm.message = 'Invalid User';
                }
            });
        }
    };

}