// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { update } = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Books',
        books: books
      });
    }
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    let newBook = new book ({
      "Title":req.body.title,
      "Price":req.body.price,
      "Author":req.body.author,
      "Genre":req.body.genre

    })

    book.create(newBook, (err) => {
      if(err){
        console.error(err);
        res.end(err);
      };
      res.redirect('/books')
    })

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

  let id = req.params.id;
  book.findById(id,{},{}, (err, bookToEdit) =>{
    if(err){
      console.error(err);
      res.end(err);
    };
    console.log(bookToEdit);
    res.render('books/details', {title:'Edit Book', books:bookToEdit});
  });
    
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.parms.id;
  let updateItem = new book({
    "_id":id,
    "Title":req.body.title,
    "Price":req.body.price,
    "Author":req.body.author,
    "Genre":req.body.genre
  });
  book.updateOne({_id:id}, updateItem, {},(err) => {
    if(err){
      console.error(err);
      res.end(err);
    }
    res.redirect('/books')
  })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
