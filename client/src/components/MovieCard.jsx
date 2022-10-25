import './MovieCard.css'
import { useState, useEffect } from 'react'
import { IMAGE_BASE_PATH } from '../globals'
import axios from 'axios'

const MovieCard = (props) => {
  const [ourMovies, setOurMovies] = useState([])

  const removeMovieCard = (evt) => {
    const movieCard = evt.currentTarget.parentNode.parentNode
    movieCard.remove()
  }

  const populateGenres = () => {
    const arr = []
    props.movie.genre_ids.forEach((genreId) => {
      for (let genre of props.genres) {
        if (genreId === genre.tmdb_id) {
          arr.push(genre._id)
        }
      }
    })

    return arr
  }

  const getOurMovie = () => {
    for (let ourMovie of ourMovies) {
      if (ourMovie.tmdb_id === props.movie.id) {
        return ourMovie._id
      }
    }

    return null
  }

  const handleNo = (evt) => {
    // removeMovieCard(evt)
  }

  const handleYes = async (evt) => {
    const newMovie = {
      tmdb_id: props.movie.id,
      poster_path: props.movie.poster_path,
      backdrop_path: props.movie.backdrop_path,
      title: props.movie.title,
      release_date: props.movie.release_date,
      overview: props.movie.overview,
      vote_average: props.movie.vote_average,
      vote_count: props.movie.vote_count,
      genre_ids: [...populateGenres()]
    }

    if (getOurMovie()) {
      const updateProfile = await axios.put(
        `http://localhost:3001/profiles/${props.profile._id}`,
        { fav_movie_ids: [...props.profile.fav_movie_ids, getOurMovie()] }
      )
    } else {
      const res = await axios.post('http://localhost:3001/movies', newMovie)

      const newMoviesArr = props.profile.fav_movie_ids

      const updateProfile = await axios.put(
        `http://localhost:3001/profiles/${props.profile._id}`,
        { fav_movie_ids: [...props.profile.fav_movie_ids, res.data._id] }
      )
    }

    // removeMovieCard(evt)
  }

  useEffect(() => {
    const getOurMovies = async () => {
      const res = await axios.get(`http://localhost:3001/movies`)

      setOurMovies(res.data.movies)
    }

    getOurMovies()
  }, [])

  return (
    <div className="MovieCard">
      <img
        src={`${IMAGE_BASE_PATH}${props.movie.poster_path}`}
        alt={props.movie.title}
      />
      <div className="movie-info">
        <h2>{props.movie.title}</h2>
      </div>

      <div className="inputs">
        <button className="no-btn" onClick={(evt) => handleNo(evt)}>
          No
        </button>
        <button className="yes-btn" onClick={(evt) => handleYes(evt)}>
          Yes
        </button>
      </div>
    </div>
  )
}

export default MovieCard
