const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT;
const cors = require("cors");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

let bookList = [
  {
    id: 1,
    title: "My Book 1",
    author_name: "Author One",
    publication_year: "2018",
    isbn: "abcdefg1234567",
    num_pages: 562,
  },
  {
    id: 2,
    title: "My Book 2",
    author_name: "Author One",
    publication_year: "2019",
    isbn: "abcdefg123456dfdf",
    num_pages: 10,
  },
  {
    id: 3,
    title: "My Book 3",
    author_name: "Author One",
    publication_year: "2020",
    isbn: "abcdefg123456df",
    num_pages: 1001,
  },
];

app.get("/", (req, res) => {
  res.send(bookList.sort((a, b) => a.num_pages - b.num_pages));
});

app.post("/", (req, res) => {
  const { title, author_name, publication_year, isbn, num_pages } = req.body;

  bookList.push({
    id: bookList.length + 1,
    title: title,
    author_name: author_name,
    publication_year: publication_year,
    isbn: isbn,
    num_pages: num_pages,
  });

  res.send(bookList);
});

app.delete("/", (req, res) => {
  const isbn = req.body.isbn;
  //const id = bookList.find((book) => book.isbn === isbn).id;
  bookList = bookList.filter((book) => book.isbn !== isbn);
  res.send(bookList);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
