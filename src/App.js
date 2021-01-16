import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNominee from './components/AddNominees';
import RemoveNominees from './components/RemoveNominees';
import logo from './SHOPPIES.png';

const App = () => {
	//state objects with useState Hook
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [nominees, setNominees] = useState([]);
	const [count, setCount] = useState(0);

	const getMovie = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

  
	const saveToLocalStorage = (items) =>{
		localStorage.setItem('react-favourites-list', JSON.stringify(items));
	}


	const addNomineeMovie = (movie) => {
		
		setCount(count + 1);
		const newNomineeList = [...nominees, movie];
    	setNominees(newNomineeList);
		saveToLocalStorage(newNomineeList);
	};

	const removeNomineeMovie = (movie) => {
    setCount(count - 1);
		const newNomineeList = nominees.filter(
			(nominee) => nominee.imdbID !== movie.imdbID
		);

		setNominees(newNomineeList);
		saveToLocalStorage(newNomineeList);
	};

	useEffect(() => {
		getMovie(searchValue);
  }, [searchValue]);

  useEffect(() => {
	const movieNominations = JSON.parse(
		localStorage.getItem('react-favourites-list')
		);
	setNominees(movieNominations);
}, []);
  

	return (

		<div className='container-fluid movie-app'>
			<nav className="navbar bt-0 mt-0">
				<span className="navbar-brand">
				<img src={logo} width="250" height="250" alt=""></img>
				</span>
				<h2 className="title mr-5">Movie awards for entrepreneurs</h2>
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				
			</nav>
			{
			count > 4 &&
			<div className="alert alert-success mt-4" role="alert">
				You've nominated 5 movies!
			</div>
			}
	  		
			<div className='row d-flex align-items-center mt-3 mb-3'>
				<MovieListHeading heading='Nominate a Movie' />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					nomineeComponent={AddNominee}
					handleNomineesClick={addNomineeMovie}
				/>
			</div>
			<div className='row d-flex align-items-center mt-3 mb-3'>
				<MovieListHeading heading='Your Nominations' />
			</div>
			<div className='row'>
				<MovieList
					movies={nominees}
					handleNomineesClick={removeNomineeMovie}
					nomineeComponent={RemoveNominees}
				/>
			</div>
		</div>
	);
};

export default App;