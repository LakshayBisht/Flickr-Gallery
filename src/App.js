import { useState, useRef, useCallback } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import usePhotoSearch from './usePhotoSearch';
import NavBar from './components/NavBar';
import ImageGrid from './components/ImageGrid';

function App() {
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);

	const { photos, hasMore, loading, error } = usePhotoSearch(query, pageNumber);

	const observer = useRef();
	const lastPhotoElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	function handleSearch(e) {
		setQuery(e.target.value);
		setPageNumber(1);
	}

	return (
		<div className=''>
			<NavBar query={query} handleSearch={handleSearch} />
			<ImageGrid
				photos={photos}
				lastPhotoElementRef={lastPhotoElementRef}
				loading={loading}
				error={error}
			/>
		</div>
	);
}

export default App;
