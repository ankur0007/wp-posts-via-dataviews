<?php
/*
Plugin Name: PostViews 
Description: A plugin to display WordPress posts in a table using the DataViews component from @wordpress/dataviews, directly in the wp-admin dashboard.
Version: 1.0
Author: Ankur Vishwakarma
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: postview-via-dataview
Domain Path: /languages
*/

if (! defined('ABSPATH')) exit;

add_action('admin_menu', function () {
    add_menu_page(
        'PostViews',
        'PostViews',
        'manage_options',
        'postview-via-dataview',
        function () {
            echo '<div id="postview-root"></div>';
        },
        'dashicons-admin-post',
        6
    );
});

add_action('admin_enqueue_scripts', 'scripts');

function scripts($hook)
{

    if ($hook !== 'toplevel_page_postview-via-dataview') {
        return;
    }

   $deps = ['wp-element', 'wp-components', 'wp-data', 'wp-api-fetch', 'wp-i18n'];

    // Add wp-dataviews only if available in this WP version

    wp_enqueue_style(
        'postview-simple-styles-default',
        plugin_dir_url(__FILE__) . 'build/style-index.css',
        array('wp-components'),
        false,
    );
    wp_enqueue_style(
        'postview-simple-styles-custom',
        plugin_dir_url(__FILE__) . 'build/index.css',
        array('wp-components'),
        false,
    );
    wp_enqueue_script(
        'postview-simple-js',
        plugin_dir_url(__FILE__) . 'build/index.js',
        $deps,
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js'),
        true
    );
}
