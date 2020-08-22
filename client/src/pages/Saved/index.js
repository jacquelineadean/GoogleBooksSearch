import React, { useState, useEffect } from 'react';
import { List, ListItem } from '../../components/List';
import DeleteBtn from '../../components/DeleteBtn';
import API from '../../utils/API';


function Saved() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        API.getBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(err => console.log(err))
    }

    function deleteBook(id) {
        API.deleteBook(id)
          .then(res => loadBooks())
          .catch(err => console.log(err));
    }

    return (
        <div className='container card'>
            <div>
                <h3>Saved Books</h3>
                <List>
                    {books.map(book => (
                        <ListItem key={books._id}>
                            <a
                                key={book._id + "link"}
                                href={book.link}
                                target={this.state.target}
                            >
                                {book.title}
                            </a>
                            <p>Written By {book.author}</p>
                            <p>
                            <img align="left" style={{paddingRight:10}}
                                src={book.image} alt="new"
                            />
                                {book.description}
                            </p>
                            <DeleteBtn onClick={() => deleteBook(book._id)} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default Saved;