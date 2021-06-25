import React from 'react';

const NavBar = ({ query, handleSearch }) => {
	const handleFormSubmit = (e) => e.preventDefault();
	return (
		<div className='navbar-fixed'>
			<nav className='nav-extended'>
				<div className='nav-wrapper'>
					<a href='#' className='brand-logo center'>
						Flickr Gallery
					</a>
				</div>
				<div className='nav-content container'>
					<div className='row'>
						<form className='col s12 m8 push-m2' onSubmit={handleFormSubmit}>
							<div className='input-field'>
								<i className='material-icons prefix'>search</i>
								<input
									type='search'
									id='search'
									required
									value={query}
									onChange={handleSearch}
								/>
								<label htmlFor='search'></label>
								{/* <i className='material-icons'>close</i> */}
							</div>
						</form>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
