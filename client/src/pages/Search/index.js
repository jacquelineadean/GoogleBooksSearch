import React, { useState, useEffect } from 'react';
import { Input, FormBtn } from '../../components/Form';
import { List, ListItem } from '../../components/List';
import SaveBtn from '../../components/SaveBtn';
import API from '../../utils/API';

function Search() {
    // Setting initial state
    const [title, setTitle] = useState("")
    const [results, setResults] = useState([])
    const [books, setBooks] = useState([])

    // Load search results and store them 
    useEffect(() => {
        if (results && results.length > 0) {
            return results;
        }
        // API.getGoogleBooks(title).then(res => setResults(res.data))
        //     .catch(err => console.log(err));
    }, [])

    // function loadBooks() {
    //     API.getGoogleBooks(title).then(res => setResults(res.data))
    //     .catch(err => console.log(err));
    // }
    //     API.getBooks().then(res => setBooks(res.data)).catch(err => console.log(err));
    // }

    // Save Book
    function saveBook(book) {
        API.saveBook(book)
            .then(res => {
                const filterBooks = results.filter(book => book.id !== res.data.id);
                setBooks({
                    ...books,
                    books: filterBooks
                })
            })
            // loadBooks())
            .catch(err => console.log(err));
    }

    // Handle input change
    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log(event.target);
        setTitle({...title, [name]: value})
        console.log(title);
    }

    // Handle submit
    function handleFormSubmit(event) {
        event.preventDefault();
        API.getGoogleBooks(title)
            .then(res => {
                setResults(res.data.items)
                console.log(results)
            })
            .catch(err => console.log(err));
    }


    return (
        <section>
            <div className='container card'>
                <h3>Book Search</h3>
                <form className='form-group'>
                    <p>Book Title</p>
                    <Input
                        name='title'
                        onChange={handleInputChange}
                        label='Book Title'
                        placeholder='Search Book Title'
                    />
                    <FormBtn
                        onClick={handleFormSubmit}
                    > 
                        Search
                    </FormBtn>
                </form>
            </div>
            <br></br>
            <div className='container card'>
                <h3>Results</h3>
                <List>
                    {results.map((book, index) => (
                        <ListItem key={book.id}>
                            <div className='card'>
                                <img src={book.volumeInfo.imageLinks.smallThumbnail} alt='book cover' />
                                <div className='card-body'>
                                    <h5 className='card-title'>{book.volumeInfo.title}</h5>
                                    <h6>{book.volumeInfo.authors}</h6>
                                    <p className='card-text'>{book.volumeInfo.description}</p>
                                    <a key={'' + index + book.id} href={book.volumeInfo.infoLink} target={this.state.target}>View</a>
                                    <SaveBtn
                                        key={'' + book.id + index}
                                        onClick={() => saveBook({
                                            title: book.volumeInfo.title,
                                            author: book.volumeInfo.authors[0],
                                            description: book.volumeInfo.description,
                                            image: book.volumeInfo.imageLinks.smallThumbnail,
                                            link: book.volumeInfo.infoLink,
                                            _id: book.id
                                        })}
                                    >
                                        Save
                                    </SaveBtn>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </div>
        </section>
    )
}

export default Search;