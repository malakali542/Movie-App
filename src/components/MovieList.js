import React from 'react';

const MovieList = (props) => {
	const NomineeComponent = props.nomineeComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className="cont mr-2 ml-2">
					<h6 className="mr-3 ml-3" >{movie.Title},{movie.Year}</h6>
					<div className='d-flex justify-content-start'>
						<img src={movie.Poster} alt='movie'></img>
						<div
							onClick={() => props.handleNomineesClick(movie)}
							className='overlay d-flex align-items-center justify-content-center'
						>
							<NomineeComponent />
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
