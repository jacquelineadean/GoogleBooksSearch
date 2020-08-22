import axios from "axios";

export default {
  // Gets all saved books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // GoogleBooks API route
  getGoogleBooks: function(title) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + title);
  }
};