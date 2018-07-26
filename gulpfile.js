const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- 常用的方法 --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// 调用方法打印
gulp.task('message', function(){
  return console.log('Gulp is running...');
});

// 拷贝所有的html文件
gulp.task('copyHtml', function(){
  gulp.src(['src/about.html',
      'src/index.html',
      'src/test.html'
  ])
      .pipe(gulp.dest('dist'));
});

// 压缩图片
gulp.task('imageMin', function(){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
    });

// 压缩js
// gulp.task('minify', function(){
//   gulp.src('src/js/*.js')
//       .pipe(uglify())
//       .pipe(gulp.dest('dist/js'));
// });

// cass转化为css 原文件名必须以.scss 结尾
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))  //打印错误信息
      .pipe(gulp.dest('dist/css'));
});

// js压缩+ 代码合并
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
      .pipe(concat('main.js'))  // 合并后的文件名叫做main.js
      .pipe(uglify())    // 压缩js
      .pipe(gulp.dest('dist/js')); // 输出的位置
});
//定义默认任务,执行多个任务
gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass','scripts']);
//
// 监听文件是否发生变化 当某些文件发生变化时，执行的是后面的任务
// gulp.task('watch', function(){
//   gulp.watch('src/images/*', ['imageMin']);
//   gulp.watch('src/sass/*.scss', ['sass']);
//   gulp.watch('src/*.html', ['copyHtml']);
//   gulp.watch('src/js/*.js', ['scripts']);
// });


/*
 给出一个基本的模板
gulp.task('controller-compress', function () {
    return gulp.src([
        'public/heu_assets/controllers/alarm/AlarmSummaryController.js', 'public/heu_assets/controllers/pay/PayInfoController.js',
        'public/heu_assets/controllers/index/HomeIndexController.js'
    ])  //选择合并的JS
        .pipe(concat('controller-compress.js'))   //合并js
        .pipe(gulp.dest('public/compress/js'))         //输出
        .pipe(rename({suffix: '.min'}))     //重命名
        .pipe(uglify({mangle : false}))
        .pipe(gulp.dest('public/compress/js'))            //输出
        .pipe(notify({message: "controller-compress ok"}));    //提示
});
*/