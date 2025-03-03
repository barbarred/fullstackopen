import { useState } from "react"

const Authors = ({authors, show, setBorn}) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    setBorn({ variables: { name, setBornTo: parseInt(year) } })

    setName('')
    setYear('')
  }

  return (
    <>
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {
    /*
    <form onSubmit={submit} >
      <h2>Set BirthYear</h2>
      <div>
      <input
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      </div>
      <div>
      <input
        type="number"
        value={year}
        onChange={({ target }) => setYear(target.value)}
      />
      </div>
      <button type="submit">update author</button>
    </form>
    */
    }
    <form onSubmit={submit}>
      <h2>Set BirthYear</h2>
      <div>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
      </div>
      <div>
        <input type="number" value={year} onChange={({ target }) => setYear(target.value)} />
      </div>
      <button onClick={submit}>update author</button>
    </form>
    </>
  )
}

export default Authors
