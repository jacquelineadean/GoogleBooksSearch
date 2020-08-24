import React, { Component } from 'react';
import { List, ListItem } from '../../components/List';
import DeleteBtn from '../../components/DeleteBtn';
import API from '../../utils/API';

class Saved extends Component {
    state = {
        books: [],
        noResults: false
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = () => {
        API.getBooks()
        .then(res => {
            if (res.data.length > 0) {
                this.setState({
                    books: res.data
                });
            } else {
                this.setState({
                    noResults: true
                });
            }
        })
        .catch(err => console.log(err));
    }

    deleteBook = id => {
        API.deleteBook(id)
          .then(res => this.getBooks())
          .catch(err => console.log(err));
    }

    render() {
        if (this.state.noResults) {
            return (
                <div className='container card'>
                    <div>
                        <h3>Saved Books</h3>
                        <div>
                            <p>You have no saved books.</p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className='container card'>
                <div>
                    <h3>Saved Books</h3>
                    <div>
                        <List>
                            {this.state.books.map(book => (
                                <ListItem key={book._id}>
                                    <a
                                        key={book._id + "link"}
                                        href={book.link}
                                        target="_blank"
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
                                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

export default Saved;