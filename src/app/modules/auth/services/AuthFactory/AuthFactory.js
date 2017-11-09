
'use strict';

angular.module('auth')
    .factory('AuthFactory', ($http, $q)=>{
        return {
            register : (user) =>{
                return $http.post('http://localhost:8000/api/users/add', user).then(function(response) {
                    return response;
                });
            },
            login : (credentials) =>{
                return $http.post('http://localhost:8000/api/auth/login', credentials).then(function(response) {
                    return response;
                });
            },
            logout : () =>{
                return $http.get('http://localhost:8000/api/auth/logout').then(function(response) {
                    return response;
                });
            },
            isLoggedIn : () =>{
                return $http.get('http://localhost:8000/api/auth/isloggedin').then(function(response) {
                    return response
                });
            }
        }
    });
