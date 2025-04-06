import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

const Books = ({books, show}) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const allGenres = books.flatMap(book => book.genres);
    const uniqueGenres = [...new Set(allGenres)];
    setGenres(uniqueGenres);
    setFilteredBooks(books);
  }, [books]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    const filtered = books.filter(book =>
      book.genres.includes(genre)
    );
    setFilteredBooks(filtered);
  };
  const showAllBooks = () => {
    setSelectedGenre(null);
    setFilteredBooks(books);
  };

  if (!show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>
      in genre <strong>{selectedGenre || 'all'}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <button
          onClick={showAllBooks}
          style={{
            margin: '5px',
            backgroundColor: selectedGenre === null ? '#4CAF50' : '#f8f9fa'
          }}
        >
          all
        </button>
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            style={{
              margin: '5px',
              backgroundColor: selectedGenre === genre ? '#4CAF50' : '#f8f9fa'
            }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}
Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      published: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  show: PropTypes.bool.isRequired,
};

export default Books

