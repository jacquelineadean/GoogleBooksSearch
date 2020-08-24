import React, { Component } from 'react';
import { Input, FormBtn } from '../../components/Form';
import { List, ListItem } from '../../components/List';
import SaveBtn from '../../components/SaveBtn';
import API from '../../utils/API';

class Search extends Component {
    // Setting initial state
    state = {
        title: "",
        noResults: true,
        results: [],
        target: "",
        books: []
    };

    // Save Book
    saveBook = book => {
        API.saveBook(book)
            .then(res => {
                const currentBooks = this.state.books;
                const filterBooks = currentBooks.filter(book => book.id !== res.data.id);
                this.setState({
                    books: filterBooks
                });
            })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title) {

        const title = this.state.title.trim();

        API.getGoogleBooks(title)
            .then(res => {

                console.log(res.data.items);

                this.setState({
                    toResults: true,
                    results: res.data.items
                });
            })
            .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <section>
                <div className='container card'>
                    <h3>Book Search</h3>
                    <form className='form-group'>
                        <p>Book Title</p>
                        <Input
                            name='title'
                            onChange={this.handleInputChange}
                            label='Book Title'
                            placeholder='Search Book Title'
                        />
                        <FormBtn
                            onClick={this.handleFormSubmit}
                        > 
                            Search
                        </FormBtn>
                    </form>
                </div>
                <br></br>
                <div className='container card'>
                    <h3>Results</h3>
                    {this.state.results.length ? (
                    <List>
                        {this.state.results.map((book, index) => (
                            <ListItem key={book.id}>
                                <div className='card'>
                                    <img align="left" style={{paddingRight:10}} src={book.volumeInfo.imageLinks.smallThumbnail} alt='book cover' />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{book.volumeInfo.title}</h5>
                                        <h6>{book.volumeInfo.authors}</h6>
                                        <p className='card-text'>{book.volumeInfo.description}</p>
                                        <a className='btn btn-sm' key={'' + index + book.id} href={book.volumeInfo.infoLink}>View</a>
                                        <SaveBtn
                                            key={'' + book.id + index}
                                            onClick={() => this.saveBook({
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
                    ) : (
                        <p>No results to Display</p>
                    )}
                </div>
            </section>
        )
    }
}

export default Search;