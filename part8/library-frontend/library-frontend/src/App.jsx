import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery, useMutation } from '@apollo/client';


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
      author
      published
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
      author
      published
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


const App = () => {
  const [page, setPage] = useState("authors");
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const [addBook] = useMutation(ADD_BOOK,{
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  });
  const [setBorn] = useMutation(SET_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  if (authors.loading)  {
    return <div>loading...</div>
  }
  if (books.loading)  {
    return <div>loading...</div>
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={authors.data.allAuthors} setBorn={setBorn}/>

      <Books show={page === "books"} books={books.data.allBooks}/>

      <NewBook show={page === "add"} addBook={addBook} />
    </div>
  );
};

export default App;
