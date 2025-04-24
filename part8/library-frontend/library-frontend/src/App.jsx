import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { gql, useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/client';
import Recommend from "./components/Recommend";


const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        __typename
      }
      id
      genres
      published
      __typename
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        __typename
      }
      published
      genres
      id
      __typename
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    )
    {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const SET_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    )
    {
      name
      born
      bookCount
    }
  }
`;
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      user{
        username
        favoriteGenre
      }
    }
  }
`
const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    booksByGenre(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'));
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("authors");
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      if (!addedBook) {
        return;
      }
      window.alert(`New book added: ${addedBook.title} by ${addedBook.author.name}`);
      const existingData = client.readQuery({ query: ALL_BOOKS });
      if (existingData && existingData.allBooks) {
        const bookAlreadyInCache = existingData.allBooks.find(
          (book) => book.id === addedBook.id
        );
  
        if (!bookAlreadyInCache) {
          client.writeQuery({
            query: ALL_BOOKS,
            data: {
              allBooks: [...existingData.allBooks, addedBook],
            },
          });
          console.log('Caché actualizada.');
        } else {
          console.log('El libro ya estaba en la caché de ALL_BOOKS.');
        }
      } else {
         console.log('No se encontraron datos existentes en caché para ALL_BOOKS.');
      }
    },
    onError: (error) => {
      console.error("Error en la suscripción BOOK_ADDED:", error);
    },
    skip: !token,
  });

  const [addBook] = useMutation(ADD_BOOK);

  const [setBorn] = useMutation(SET_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  if (authors.loading) return <p>Cargando...</p>;
  if (authors.error) return <p>Error: {authors.error.message}</p>;
  const logout = () => {
    setToken(null);
    localStorage.clear()
    client.resetStore()
    setPage("authors");
  }
  
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("library-user-token", newToken);
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button> }
        {token && <button onClick={() => setPage("recommend")}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>
      
      {authors.data && (
        <Authors show={page === "authors"} authors={authors.data.allAuthors} setBorn={setBorn}/>
      )}

      {books.data && (
        <Books show={page === "books"} books={books.data.allBooks} BOOKS_BY_GENRE={BOOKS_BY_GENRE}/>
      )}

      <NewBook show={page === "add"} addBook={addBook} setPage={setPage}/>

      { books.data && <Recommend show={page === "recommend"} books={books.data.allBooks} user={user}/>}

      {!token && <LoginForm show={page === "login"} setToken={handleLogin} LOGIN={LOGIN} setPage={setPage} setUser={setUser} />}
      
    </div>
  );
};

export default App;
