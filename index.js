const path = require('path')

const wp = require('./src/wp-cli')
const test = path.resolve(__dirname, 'test');

wp({
    command: 'core download',
    cwd: test
})

const php = `
define('WP_DEBUG', true);
define('DISALLOW_FILE_EDIT', true);
define('AUTOSAVE_INTERVAL', 600);

define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '256M');

@ini_set('upload_max_filesize', '256M');
@ini_set('max_post_size', '256M');
@ini_set('max_input_vars', 5000);
`

wp({
    command: 'config create',
    cwd: test,
    input: php,
    flags: {
        dbname: 'test',
        dbuser: 'root',
        dbpass: 'root',
        'extra-php': true
    }
})

wp('db create', {
    cwd: test
})

wp({
    command: 'core install',
    cwd: test,
    flags: {
        url: 'http://localhost/test',
        title: 'Test',
        admin_user: 'indigotree',
        admin_password: 'password',
        admin_email: 'website@indigotree.co.uk'
    }
})

wp('user update 1', {
    cwd: test,
    flags: {
        user_url: 'https://indigotree.co.uk',
        first_name: 'Indigo Tree',
        display_name: 'Indigo Tree'
    }
})

wp({
    command: 'user create wpengine noreply@wpengine.com',
    cwd: test,
    async: true,
    flags: {
        role: 'administrator',
        display_name: 'wpengine',
    }
})

var sample = wp({
    command: 'post list',
    cwd: test,
    flags: {
        post_type: 'page',
        posts_per_page: 1,
        post_status: 'publish',
        pagename: 'sample-page',
        field: 'ID',
        format: 'ids'
    }
})

wp({
    command: `post delete ${sample.toString()}`,
    cwd: test,
    async: true
})

var admin = wp({
    command: 'user get indigotree',
    cwd: test,
    flags: {
        field: 'ID',
        format: 'json'
    }
})

wp({
    command: 'post create',
    cwd: test,
    flags: {
        post_type: 'page',
        post_title: 'Home',
        post_status: 'publish',
        post_author: admin.toString()
    }
})

wp('option update blog_public 0', { cwd: test, async: true })
wp('option update posts_per_page 6', { cwd: test, async: true })
wp('option update timezone_string "Europe/London"', { cwd: test, async: true })
wp('option update blogdescription ""', { cwd: test, async: true })
wp('option update thread_comments 1', { cwd: test, async: true })
wp('option update uploads_use_yearmonth_folders 0', { cwd: test, async: true })

wp('core language install en_GB', {
    cwd: test,
    async: true,
    flags: { activate: true }
})


wp('wp option update show_on_front "page"', { cwd: test, async: true })

var home = wp({
    command: 'post list',
    cwd: test,
    flags: {
        post_type: 'page',
        post_status: 'publish',
        posts_per_page: 1,
        pagename: 'home',
        field: 'ID',
        format: 'ids'
    }
})

wp(`wp option update page_on_front ${home.toString()}`, { cwd: test, async: true })

wp('rewrite structure "/%postname%/"', {
    cwd: test,
    flags: {
        hard: true
    }
})
wp('rewrite flush', {
    cwd: test,
    flags: {
        hard: true
    }
})

wp({
    command: 'plugin delete akismet',
    async: true,
    cwd: test
})

wp({
    command: 'plugin delete hello',
    async: true,
    cwd: test
})



















// astro.install({
//     directory: test,
//     dbname: 'root',
//     dbpass: 'root',
//     php: php,
//     url: '',
//     title: '',
//     admin_user: '',
//     admin_password: '',
//     admin_email: '',
//     user_url: '',
//     first_name: '',
//     display_name: ''
// })



// var home = wp('post list', {
//     post_type: 'page',
//     post_status: 'publish',
//     posts_per_page: 1,
//     pagename: 'home',
//     field: 'ID',
//     format: 'ids'
// })
// Option(`update page_on_front ${home}`, { async: true })

















// Core('download')

// Config('create', {

// })

// DB('create', {

// })

// Core('install', {

// })

// User('update', {

// })

// var samplePage = Post('list', {
//     post_type: 'page',
//     posts_per_page: 1,
//     post_status: 'publish',
//     pagename: 'sample-page',
//     field: 'ID',
//     format: 'ids'
// })

// Post(`delete ${samplePage}`, {
//     async: true
// })

// var wpuser = 'indigotree'
// var admin = User(`get ${wpuser}`, {
//     field: 'ID',
//     format: 'ids'
// })

// Post('create', {
//     post_type: 'page',
//     post_title: 'Home',
//     post_status: 'publish',
//     post_author: admin,
//     async: true
// })

// Option('update blog_public 0', { async: true })
// Option('update posts_per_page 6', { async: true })
// Option('update timezone_string "Europe/London"', { async: true })
// Option('update blogdescription ""', { async: true })
// Option('update thread_comments 1', { async: true })
// Option('update thread_comments_depth 2', { async: true })
// Option('update uploads_use_yearmonth_folders 0', { async: true })

// Core('language install en_GB', {
//     activate: true,
//     async: true
// })

// Option('update show_on_front "page"', { async: true })
// var home = Post('list', {
//     post_type: 'page',
//     post_status: 'publish',
//     posts_per_page: 1,
//     pagename: 'home',
//     field: 'ID',
//     format: 'ids'
// })
// Option(`update page_on_front ${home}`, { async: true })

// Rewrite('structure "/%postname%/"', { hard: true })
// Rewrite('flush', { hard: true })

// Plugin('delete akismet', { async: true })
// Plugin('delete hello', { async: true })

// var themes = Theme('list', {
//     status: 'inactive',
//     field: 'name',
//     format: 'json'
// })
// for (let theme in themes) {
//     Theme(`delete ${themes[theme]}`, { async: true })
// }

// // Add branding plugin
// Plugin('activate lt-branding', { async: true })

// // Add Developer plugin
// Plugin('activate origin-developer', { async: true })

// Plugin('install antispam-bee', { activate: true, async: true })
// Plugin('install iwp-client', { async: true })
// Plugin('install wordpress-seo', { activate: true, async: true })
// Plugin('install customizer-remove-all-parts', { activate: true, async: true })
// Plugin('install disable-emojis', { activate: true, async: true })
// Plugin('install bootstrap-3-shortcodes', { activate: true, async: true })
// Plugin('install google-analytics-for-wordpress', { async: true })
// Plugin('install tiny-compress-images', { activate: true, async: true })
// Plugin('install https://updraftplus.com/wp-content/updraftplus.zip', { async: true })
// Plugin('install worker', { async: true })

// // Add origin theme
// Theme('activate origin-theme', { async: true })

// if (Plugin('is-installed origin-developer')) {
//     Post('create', {
//         post_type: 'page',
//         post_title: 'Typography',
//         post_status: 'publish',
//         post_content: '[ipsum]',
//         post_author: admin,
//         async: true
//     })
// }

// Menu('create "Main Navigation"')
// Menu('location assign main-navigation primary')