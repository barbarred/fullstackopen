import { useState, useEffect } from 'react'

const Recommend = ({books, show}) => {
    const [userBooksByGenr, setUserBooksByGenr] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = localStorage.getItem('loggedUser')
        setUser(JSON.parse(user))
    },[])

    useEffect(() => {
        if(user && books) {
            const userBooks = books.filter((book) => book.genres.includes(user.favoriteGenre))
            setUserBooksByGenr(userBooks)
        }
    }
    , [user, books])

    if(!show) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>
            books in your favorite genr <strong></strong>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {userBooksByGenr.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend