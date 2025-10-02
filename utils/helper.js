// utils/helper.js
/**
 * Format the raw post data from WP REST API to match the fields defined
 * in src/fields.js
 * @param {Array} data - Raw post data from WP REST API
 * @returns {Array} Formatted post data
 */
export const formatPosts = (data) => {
    return data.map((post) => ({
        id: post.id,
        title: post.title.rendered,
        date: post.date,
        author: post._embedded?.author?.[0]?.name || 'Unknown',
        categories: post._embedded?.['wp:term']?.[0]?.map((cat) => cat.name) || [],
        tags: post._embedded?.['wp:term']?.[1]?.map((tag) => tag.name) || [],
        // Add custom meta fields here if needed
    }));
};