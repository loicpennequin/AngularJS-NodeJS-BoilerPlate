const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      concat       = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps   = require('gulp-sourcemaps');
      nodemon      = require('gulp-nodemon'),
      cond         = require('gulp-cond'),
      ngTemplates  = require('gulp-angular-templates'),
      flatten      = require('gulp-flatten'),
      livereload   = require('gulp-livereload'),
      inject       = require('gulp-inject-string'),
      open         = require('gulp-open'),
      {argv}       = require('yargs'),
      path         = require('path'),
      fs           = require('fs'),
      babelify     = require('babelify'),
      browserify   = require('browserify'),
      source       = require('vinyl-source-stream');
      buffer       = require('vinyl-buffer');
      del          = require('del'),
      runSequence  = require('run-sequence'),

      require('babel-core');

 const BROWSER_SYNC_RELOAD_DELAY = 500;


// If gulp was called in the terminal with the --prod flag, set the node environment to production
if (argv.prod) {
    process.env.NODE_ENV = 'production';
}
let PROD = process.env.NODE_ENV === 'production';

//  Config TODO
const config = {
    paths: {
        baseSrc : "./src/app/",
        baseDest: PROD ? './src/dist/' : './src/build/'
    }
};

// Browserify config
const b = browserify({
    entries : [config.paths.baseSrc + 'app.bundle.js'],
    debug : true
})
.transform('babelify');


/**
* Gulp Tasks
**/

// Clears the contents of the dist and build folder
gulp.task('clean', () => {
    return del(path.join(config.paths.baseDest, '**/*')).then(paths => {});
});

// Compiles SASS to CSS and adds font-awesome
gulp.task('sass', ()=>{
    return gulp.src(config.paths.baseSrc + 'app.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(config.paths.baseDest, "css")))
        .pipe(cond(!PROD, livereload()));
});

gulp.task('font-awesome', ()=>{
    return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(path.join(config.paths.baseDest, "css")))
})

gulp.task('css', (cb) => {
    runSequence('sass', 'font-awesome', cb);
});

// Compile templates for each angular module and inject them through $templateCache
gulp.task('html', ()=> {
    const getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory()),
          dirs = getDirs(path.join(config.paths.baseSrc,'modules'));
    dirs.forEach((dir)=>{
        gulp.src(path.join(config.paths.baseSrc, `modules/${dir}/**/*.html`))
            .pipe(flatten())
            .pipe(ngTemplates({module: dir}))
            .pipe(concat(`${dir}.templates.js`))
            .pipe(gulp.dest(path.join(config.paths.baseSrc, `modules/${dir}`)))
            .pipe(cond(!PROD, livereload()));
    })
});

// Bundles JS files
gulp.task('js', ()=>{
    return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(cond(!PROD, sourcemaps.init({loadMaps: true})))
    .pipe(cond(!PROD, sourcemaps.write('.')))
    .pipe(gulp.dest(path.join(config.paths.baseDest,"/js")))
    .pipe(cond(!PROD, livereload()))
});

// watcher
gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(path.join(config.paths.baseSrc, '**/*.html'), ['html', 'js']);
    gulp.watch(path.join(config.paths.baseSrc, '**/*.sass'), ['sass']);
    gulp.watch(path.join(config.paths.baseSrc, '**/*.js'), ['js']);
});

// Run Express server
gulp.task('serve', function () {
    let called = false;
    return nodemon({
      script: 'server.js',
      ignore: [
              './src',
              './git',
              './gulpfile.js'
          ]
      })
      .on('start', function onStart() {
        if (!called) { cb(); }
        called = true;
      })
});

//Open new browser window
gulp.task('open', function(){
    gulp.src(__filename)
        .pipe(open({uri: 'http://localhost:8000', app: 'chrome'}));
});


gulp.task('default', (cb) => {
    runSequence('clean', 'html', 'css', 'js', 'serve', 'watch', 'open', cb);
});


/**
* Generators
**/

// Generates an AngularJS module
gulp.task('module', ()=>{
    let moduleName = argv.m,
        dir = path.join(config.paths.baseSrc, `modules/${moduleName}`),
        content = require('./templates/module-template.js')(moduleName);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(`${dir}/${moduleName}.js`, content);
    fs.writeFileSync(`${dir}/${moduleName}.sass`, "");
    fs.writeFileSync(`${dir}/${moduleName}.templates.js`, "");
    fs.appendFileSync(config.paths.baseSrc + 'app.sass', `\n@import './modules/${moduleName}/${moduleName}.sass'`);
    let moduleReq = `\nrequire('./modules/${moduleName}/${moduleName}.js');`,
        templatesReq = `\nrequire('./modules/${moduleName}/${moduleName}.templates.js');`;
    return gulp.src(config.paths.baseSrc + 'app.bundle.js')
        .pipe(inject.after('//modules', moduleReq ))
        .pipe(inject.after(moduleReq, templatesReq))
        .pipe(gulp.dest(config.paths.baseSrc));
});

// Generates an AngularJS component
gulp.task('component', ()=>{
    let moduleName = argv.m,
        componentName = argv.c,
        dir = config.paths.baseSrc + `modules/${moduleName}/components`,
        htmlContent = require('./templates/component-html-template.js')(componentName),
        jsContent = require('./templates/component-js-template.js')(moduleName, componentName);

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.mkdirSync(`${dir}/${componentName}`);

    fs.writeFileSync(`${dir}/${componentName}/${componentName}.component.html`, htmlContent);
    fs.writeFileSync(`${dir}/${componentName}/${componentName}.component.sass`, "");
    fs.writeFileSync(`${dir}/${componentName}/${componentName}.component.js`, jsContent);
    fs.appendFileSync(config.paths.baseSrc + `modules/${moduleName}/${moduleName}.sass`, `\n@import   './components/${componentName}/${componentName}.component.sass'`);

    let componentReq = `\nrequire('./modules/${moduleName}/components/${componentName}/${componentName}.component.js')`;

    return gulp.src(config.paths.baseSrc + 'app.bundle.js')
        .pipe(inject.after(`require('./modules/${moduleName}/${moduleName}.templates.js');`, componentReq ))
        .pipe(gulp.dest(config.paths.baseSrc));
});

// Generates an AngularJS factory
gulp.task('factory', ()=>{
    let moduleName = argv.m,
        factoryName = argv.f,
        dir = config.paths.baseSrc + `modules/${moduleName}/services`,
        content = require('./templates/factory-template.js')(moduleName, factoryName);

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.mkdirSync(`${dir}/${factoryName}`);

    fs.writeFileSync(`${dir}/${factoryName}/${factoryName}.js`, content);

    let req = `\nrequire('./modules/${moduleName}/services/${factoryName}/${factoryName}.js')`;

    return gulp.src(config.paths.baseSrc + 'app.bundle.js')
        .pipe(inject.after(`require('./modules/${moduleName}/${moduleName}.js');`, req ))
        .pipe(gulp.dest(config.paths.baseSrc));
});

// Generates an AngularJS directive TODO
