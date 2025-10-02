import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import './App.css';
import App from './App';

domReady(() => {
	const el = document.getElementById('postview-root');
	if (el) {
		console.log('postview-root found!');
		createRoot(el).render(<App />);
	} else {
		console.error('postview-root not found!');
	}
});
