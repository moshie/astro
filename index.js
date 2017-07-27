const {
    Core, Config, DB, User, Post, Option, Rewrite, Theme, Plugin, Menu
} = require('./src/wp-cli')

Core('download')

Config('create', {

})

DB('create', {

})

Core('install', {

})

User('update', {

})

var samplePage = Post('list', {
    post_type: 'page',
    posts_per_page: 1,
    post_status: 'publish',
    pagename: 'sample-page',
    field: 'ID',
    format: 'ids'
})

Post(`delete ${samplePage}`, {
    async: true
})

var wpuser = 'indigotree'
var admin = User(`get ${wpuser}`, {
    field: 'ID',
    format: 'ids'
})

Post('create', {
    post_type: 'page',
    post_title: 'Home',
    post_status: 'publish',
    post_author: admin,
    async: true
})

Option('update blog_public 0', { async: true })
Option('update posts_per_page 6', { async: true })
Option('update timezone_string "Europe/London"', { async: true })
Option('update blogdescription ""', { async: true })
Option('update thread_comments 1', { async: true })
Option('update thread_comments_depth 2', { async: true })
Option('update uploads_use_yearmonth_folders 0', { async: true })

Core('language install en_GB', {
    activate: true,
    async: true
})

Option('update show_on_front "page"', { async: true })
var home = Post('list', {
    post_type: 'page',
    post_status: 'publish',
    posts_per_page: 1,
    pagename: 'home',
    field: 'ID',
    format: 'ids'
})
Option(`update page_on_front ${home}`, { async: true })

Rewrite('structure "/%postname%/"', { hard: true })
Rewrite('flush', { hard: true })

Plugin('delete akismet', { async: true })
Plugin('delete hello', { async: true })

var themes = Theme('list', {
    status: 'inactive',
    field: 'name',
    format: 'json'
})
for (let theme in themes) {
    Theme(`delete ${themes[theme]}`, { async: true })
}

// Add branding plugin
Plugin('activate lt-branding', { async: true })

// Add Developer plugin
Plugin('activate origin-developer', { async: true })

Plugin('install antispam-bee', { activate: true, async: true })
Plugin('install iwp-client', { async: true })
Plugin('install wordpress-seo', { activate: true, async: true })
Plugin('install customizer-remove-all-parts', { activate: true, async: true })
Plugin('install disable-emojis', { activate: true, async: true })
Plugin('install bootstrap-3-shortcodes', { activate: true, async: true })
Plugin('install google-analytics-for-wordpress', { async: true })
Plugin('install tiny-compress-images', { activate: true, async: true })
Plugin('install https://updraftplus.com/wp-content/updraftplus.zip', { async: true })
Plugin('install worker', { async: true })

// Add origin theme
Theme('activate origin-theme', { async: true })

if (Plugin('is-installed origin-developer')) {
    Post('create', {
        post_type: 'page',
        post_title: 'Typography',
        post_status: 'publish',
        post_content: '[ipsum]',
        post_author: admin,
        async: true
    })
}

Menu('create "Main Navigation"')
Menu('location assign main-navigation primary')