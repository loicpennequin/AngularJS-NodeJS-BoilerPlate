angular.module('app', ['ui.router', 'ngMessages', 'ngAnimate', 'ngCookies', 'ngResource'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('sampleState', {
        url: "/",
        component: "app"
      });
  })
  .component('app', {
      template: `
      <div style="font-family: 'Poppins', sans serif; background: linear-gradient(#eee,#ccd); min-height:100vh;">
        <h1 style="text-align: center;margin: 0 auto 50px; background: linear-gradient(#2a3c5b, #e07279), url('img/header-bg.jpg'); background-blend-mode: color; background-position: center center; background-size: cover; padding: 80px 40px; color: #eee; font-weight: 700;">
          <img src="img/logo.png" style="width: 10%; filter: hue-rotate(160DEG) brightness(80%) contrast(135%); border-radius: 50%;"/>
          <div style="font-size:1.3em;">Howdy there!</div>
          <div style="font-weight: 400; font-size: 0.6em;">Thanks for using my boilerplate.</div>
        </h1>
        <div style="max-width: 800px; margin: 0 auto 70px; padding: 25px; background: #eee; border-radius: 6px; box-shadow: 0 5px 5px -2px #333; font-family:'Arial'">
          <p> Hello and welcome to your app!</p>
          <p> It is currently in it's default state 'sampleState' (as in ui-router state).</p>
          <p> You can manage your app states in <pre>./client/app/app.js</pre></p>
          <p> To add angular modules/components/services/directives to your app, you can use the CLI :</p>
          <li> gulp module --m modulename </li>
          <li> gulp component --m modulename  --c componentname</li>
          <li> gulp service --m modulename  --s servicename <span style="color:#DF4C58;"><strong>WIP</strong></span></li>
          <li> gulp factory --m modulename  --f factoryname</li>
          <li> gulp directive --m modulename  --d directivename <span style="color:#DF4C58;"><strong>WIP</strong></span></li>
          <p>Don't forget to create your database and to configure your .env file located at <pre>./config</pre></p>
          <p>Happy coding ! 🤓 </p>
        </div>
        <footer style="background: linear-gradient(#5b5b6e, #494959); color: #eee; padding: 15px 15px 15px 35px; ">&#169;Daria 2017
      </div>
      `
  })
