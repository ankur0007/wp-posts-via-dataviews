import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { DataViews, VIEW_LAYOUTS } from '@wordpress/dataviews';
import { __ } from '@wordpress/i18n';
import fields from './fields';
import { formatPosts } from '../utils/helper';

//debug(fields);
const App = () => {
	const [view, setView] = useState({
		type: 'table', // or 'grid', 'list'
		perPage: 10, //Items per page
		currentPage: 1,
		sort: { field: 'id', direction: 'asc' }, //Default sort
		fields: [
			//Show these fields in the view by default
			'id',
			'title',
			'date',
			'author',
			'categories',
			'tags',
		],
	});

	const [posts, setPosts] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);

	// Fetch posts from WP REST API
	useEffect(() => {
		apiFetch({ path: '/wp/v2/posts?per_page=10&_embed=1', parse: false }).then((response) => {
			response.json().then((data) => {
				const formattedData = formatPosts(data);
				setPosts(formattedData);
			});

			//Set Pagination Info
			setTotalItems(response.headers.get('X-WP-Total'));
			setTotalPages(response.headers.get('X-WP-TotalPages'));
		});
	}, []);

	/**
	 * Handle view changes like pagination, sorting, searching
	 *
	 * @param {OBJECT} newView
	 */
	const handleChangeView = (newView) => {
		setView(newView);

		const sortFieldMap = { id: 'id', title: 'title', date: 'date' };
		const orderby = newView.sort?.field ? sortFieldMap[newView.sort.field] : 'date';
		const order = newView.sort?.direction || 'asc';
		const page = newView.page || newView.currentPage;
		const perPage = newView.perPage || 10;

		let path = `/wp/v2/posts?per_page=${perPage}&page=${page}&_embed=1`;

		if (newView.search) {
			path += `&search=${encodeURIComponent(newView.search)}`;
		}

		if (newView.sort) {
			path += `&orderby=${orderby}&order=${order}`;
		}

		// Fetch posts with headers to get total count
		apiFetch({ path, parse: false }).then((response) => {
			response.json().then((data) => {
				const formattedData = formatPosts(data);
				setPosts(formattedData);
			});
			// setTotalItems(response.headers.get('X-WP-Total'));
			// setTotalPages(response.headers.get('X-WP-TotalPages'));
		});
	};
	// Static posts for debugging
	// const posts = [
	//     { id: 1, title: 'Hello', date: '2025-10-01' },
	//     { id: 2, title: 'World', date: '2025-10-01' },
	// ];

	// Top-level actions
	const topActions = [
		{
			label: 'Add New Post',
			onClick: () => {
				// Redirect to WP admin "Add New Post"
				window.open('/wp-admin/post-new.php', '_blank');
			},
		},
	];

	const actions = [
		{
			label: 'Edit', // Text shown on button
			onClick: (row) => {
				// row contains all the data for this item
				alert('Edit post ' + row.id);
			},
		},
		{
			label: 'Delete',
			onClick: (row) => {
				if (confirm(`Are you sure you want to delete post ${row.id}?`)) {
					console.log('Delete', row.id);
				}
			},
		},
	];

	return (
		<div className="postview-wrapper">
			<div className="postview-header">
				{topActions.map((action) => (
					<button
						key={action.label}
						onClick={action.onClick}
						className="postview-add-btn"
					>
						{action.label}
					</button>
				))}
			</div>

			<DataViews
				data={posts}
				fields={fields}
				view={view}
				onChangeView={handleChangeView}
				defaultLayouts={[VIEW_LAYOUTS.TABLE, VIEW_LAYOUTS.GRID, VIEW_LAYOUTS.LIST]}
				paginationInfo={{
					totalPages,
					totalItems,
					perPage: view.perPage,
					currentPage: view.currentPage,
				}}
				actions={actions}
			/>
		</div>
	);
};

export default App;
