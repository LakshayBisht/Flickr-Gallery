import React, { useEffect } from 'react';
import M from 'materialize-css';
import NotFound from '../assets/images/404.png';
import loadingGIF from '../assets/images/loading.gif';

const ImageGrid = ({ photos, lastPhotoElementRef, loading, error }) => {
	useEffect(() => {
		let ele = document.querySelectorAll('.material-box');
		M.Materialbox.init(ele, {});
	});
	return (
		<div className='container' style={{ marginTop: '100px' }}>
			<div className='row card'>
				{photos.map((photo, index) => {
					if (photos.length === index + 1) {
						return (
							<div
								ref={lastPhotoElementRef}
								className='col s12 m6 l4 x3'
								key={photo.id}
							>
								<img
									src={photo.url}
									className='material-box responsive-img card'
									alt='img'
								/>
							</div>
						);
					} else {
						return (
							<div className='col s12 m6 l4 x3' key={photo.id}>
								<img
									src={photo.url}
									className='material-box responsive-img card'
									alt='img'
								/>
							</div>
						);
					}
				})}
			</div>
			{!loading && photos.length === 0 && !error && (
				<div className='row'>
					<img className='responsive-img' src={NotFound} alt='Not Found' />
				</div>
			)}
			{loading && (
				<div className='center-align'>
					<img
						className='responsive-img'
						src={loadingGIF}
						alt='loading...'
						width='50px'
					/>
				</div>
			)}
			{error && (
				<div className='center-align'>
					<i className='material-icons large'>error_outline</i>
					<h1>Something Went Wrong</h1>
				</div>
			)}
		</div>
	);
};

export default ImageGrid;
