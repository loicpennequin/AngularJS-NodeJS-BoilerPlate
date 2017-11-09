angular.module('app', ['auth', 'ui.router', 'ngMessages', 'ngAnimate', 'ngCookies', 'ngResource'])
  .component('app', {
      template: `
      <div style="font-family: 'Poppins', sans serif; background: linear-gradient(#eee,#ccd); min-height:100vh;">

        <h1 style="text-align: center;margin: 0 auto 50px; background: linear-gradient(#2a3c5b, #e07279), url('img/header-bg.jpg'); background-blend-mode: color; background-position: center center; background-size: cover; padding: 80px 40px; color: #eee; font-weight: 700;">
          <img src="img/logo.png" style="width: 10%; filter: hue-rotate(160DEG) brightness(80%) contrast(135%); border-radius: 50%;"/>
          <div style="font-size:1.3em;">Howdy there!</div>
          <div style="font-weight: 400; font-size: 0.6em;">Thanks for using my boilerplate.</div>
        </h1>

        <div style="max-width:55vw; margin: 0 auto 70px; padding: 40px; background: #eee; border-radius: 6px; box-shadow: 0 5px 5px -2px #333; font-family:'Arial'">

          <h2> Hello and welcome to your app!</h2>
          <p> It is currently in it's default state 'sampleState' (as in ui-router state).</p>
          <p> At the moment your app has 2 modules : "app" and "auth"</p>

          <h3>The app module</h3>
          <p> The app module is your main module which gather all your other modules and can be found at <pre>./client/app/app.js</pre>. It only has one component used to render this page. Feel free to remove the component but <strong>DO NOT</strong> remove the app.js file entirely, you'll need it !!!</p>

          <h3>The auth module</h3>
          <p>The auth module's purpose is to show you the back end logic included within this boilerplate for authentication using Passport.js and a local strategy. you can see it in action at the bottom of this page. In order for it to work, you need to have a MySQL database ready with at least a users table containing id, username, password and email columns. Feel free to remove it if you wish to incorporate your own logic.</p>

          <h3>Routing</h3>
          <p> This boilerplate has a client-side logic driven by a component-based architecture. That means that we won't be using using the ngRoute module, which doesn't support components, but ui-router, which is states-based and not route-based. don't worry, it's basically the same ! You can manage your app states at <pre>./client/app/app.routes.js</pre></p>

          <h3>Gulp</h3>
          <p>This boilerplate contains several tasks to build your apps. to use them, you need to have gulp installed globally, but if you're reading this, I guess it's already done.</p>
          <pre>npm install -g gulp</pre>
          <p>and that's it ! Now you can use the Gulp tasks at your disposal:</p>
          <li>gulp watch : will watch any changes to your HTML, SASS, and JS files and rebuild your app accordingly.</br> <span style="color:#DF4C58;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> </span> if you're using windows cmd, sometimes it won't detect when you create new files. you can use another shell like Git Bash instead, for example.</li>
          <li>gulp html, gulp sass, gulp js : using these commandes will rebuild the HTML/SASS/JS portions of your app. </br><span style="color:#DF4C58;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span> You need to use the gulp js command after using gulp html. this is because gulp html loads your modules views in the angular $templatecache by updating the ModuleName.templates.js file, so you need to rebuild your JS bundle after this.</li>
          <li>gulp : the default task that will clean your build folder, fully build and bundle your app's HTML, SASS and JS, launch the nodeJS server using nodemon, launch the command gulp watch and open your app in the browser.</li>

          <h3>Generators</h3>
          <p>Managing your file structure can be painful and error prone, especially if you want to keep it clean and fragmented. Who hasn't already spent an unnecessary amount of time findind out why your component isn't loading, only to find out you forgot to add it to your build bundle? To keep your mental health in check, this boilerplate provides several CLI generators using Gulp, to generate components automatically and do all the wiring for you !</p>
          <p>In order to add angular modules/components/services/directives to your app, type the following commands into your shell of choice :</p>
          <li> gulp module --m modulename </li>
          <li> gulp component --m modulename  --c componentname</li>
          <li> gulp service --m modulename  --s servicename <span style="color:#DF4C58;"><strong>WIP</strong></span></li>
          <li> gulp factory --m modulename  --f factoryname</li>
          <li> gulp directive --m modulename  --d directivename <span style="color:#DF4C58;"><strong>WIP</strong></span></li>

          <h3>We're almost done !</h3>
          <p>Don't forget to create your database and to configure your .env file located at <pre>./config</pre></p>
          <p><strong>THIS IS NECESSARY IF YOU WANT THE AUTH MODULE TO WORK !</strong>
          <p>Happy coding ! 🤓 </p>
          <p style="color:#DF4C58;">TODO : Improve watcher</p>
          <p style="color:#DF4C58;">TODO : Make a separate bundle for JS libraries to reduce bundling time which quickly gets annoyingly long.</p>

          <div style="display: flex; flex-direction:row; justify-content:space-between;">
            <register-form></register-form>
            <login-form></login-form>
          </div>
        </div>
        <footer style="background: linear-gradient(#5b5b6e, #494959); color: #eee; padding: 15px 15px 15px 35px; ">&#169;Daria 2017
      </div>
      `
  })
