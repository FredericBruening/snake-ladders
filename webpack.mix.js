let mix = require('laravel-mix');

mix.js('src/index.js', 'js/index.js');
mix.copy('node_modules/p5/lib/p5.min.js', 'public/js/p5.min.js');
mix.browserSync({
    proxy: 'snake-ladders.test',
    reloadDebounce: 2000
}).setPublicPath('public');
