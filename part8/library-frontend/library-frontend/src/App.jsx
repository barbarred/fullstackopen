import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';
import Recommend from "./components/Recommend";


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
      }
      published
      genres
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


const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const client = useApolloClient()
  const [addBook] = useMutation(ADD_BOOK,{
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS}, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    },
  });
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
        <Books show={page === "books"} books={books.data.allBooks}/>
      )}

      <NewBook show={page === "add"} addBook={addBook} setPage={setPage}/>

      { books.data && <Recommend show={page === "recommend"} books={books.data.allBooks} token={token}/>}

      {!token && <LoginForm show={page === "login"} setToken={setToken} LOGIN={LOGIN} setPage={setPage}/>}
      
    </div>
  );
};

export default App;
