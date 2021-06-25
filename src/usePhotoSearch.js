import { useState, useEffect } from 'react';
import axios from 'axios';

const usePhotoSearch = (query, pageNumber) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setPhotos([]);
	}, [query]);

	useEffect(() => {
		const api = {
			url: 'https://api.flickr.com/services/rest',
			key: process.env.API_KEY,
		};
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: 'GET',
			url: api.url,
			params: {
				method:
					query === '' ? 'flickr.photos.getRecent' : 'flickr.photos.search',
				api_key: api.key,
				format: 'json',
				nojsoncallback: 1,
				per_page: 40,
				page: pageNumber,
				tags: query,
			},
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setPhotos((prev) => [
					...new Set([
						...prev,
						...res.data.photos.photo.map((p) => ({
							id: p.id,
							url: `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`,
						})),
					]),
				]);
				setHasMore(res.data.photos.photo.length > 0);
				setLoading(false);
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				setLoading(false);
				setError(true);
			});
		return () => cancel();
	}, [query, pageNumber]);
	return { loading, error, photos, hasMore };
};

export default usePhotoSearch;
