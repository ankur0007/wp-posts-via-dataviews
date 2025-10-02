import { __ } from '@wordpress/i18n';

const fields = [
	{
		id: 'id',
		label: __('ID'),
		enableGlobalSearch: true,
	},
	{
		id: 'title',
		label: __('Title'),
		getValue: ({ item }) => item.title,
		render: ({ item }) => (
			<a
				href={`/wp-admin/post.php?post=${item.id}&action=edit`}
				target="_blank"
				rel="noreferrer"
			>
				{item.title}
			</a>
		),
		enableGlobalSearch: true,
	},
	{
		id: 'author',
		label: __('Author'),
		getValue: ({ item }) => item.author,
		render: ({ item }) => <span>{item.author}</span>,
		enableGlobalSearch: true,
	},

	{
		id: 'categories',
		label: 'Categories',
		getValue: ({ item }) => {
			return item.categories.join(', ');
		},
		enableGlobalSearch: true,
	},
	{
		id: 'tags',
		label: 'Tags',
		getValue: ({ item }) => {
			return item.tags.join(', ');
		},
		enableGlobalSearch: true,
	},
	{
		id: 'date',
		label: __('Date'),
		getValue: ({ item }) => item.date,
		render: ({ item }) => <span>{formatDate(item.date)}</span>,
		enableGlobalSearch: true,
	},
	// Add custom fields/meta like:
	// { id: 'custom_field', label: 'Custom Field', getValue: ..., render: ... }
];

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};
export default fields;
