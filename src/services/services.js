import { nanoid } from "nanoid";
import InvalidRequest from "../helper/error.js";
import books from "../data/books.js";

const getSpesificBooks = (queries) => {
  let bookshelf = [];

  for (const [key, value] of queries) {
    let selectedBooks = books;

    if (key === "name") {
      selectedBooks = selectedBooks.filter((book) =>
        book.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    if (key === "reading") {
      selectedBooks = selectedBooks.filter((book) =>
        value === "1" ? book.reading : !book.reading
      );
    }

    if (key === "finished") {
      selectedBooks = selectedBooks.filter((book) =>
        value === "1" ? book.finished : !book.finished
      );
    }

    bookshelf.push(
      ...selectedBooks.map((item) => ({
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      }))
    );
  }

  return bookshelf;
};

const addBook = (body) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = body;

  const id = nanoid(18);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if (!name)
    throw new InvalidRequest(
      400,
      "Gagal menambahkan buku. Mohon isi nama buku"
    );

  if (readPage > pageCount)
    throw new InvalidRequest(
      400,
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    );

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (!isSuccess) throw new InvalidRequest(400, "Failde to add the book");

  return id;
};

const getBooks = (query) => {
  let bookshelf = [];

  const queries = Object.entries(query);

  if (queries.length > 0) {
    return getSpesificBooks(queries);
  } else {
    for (const book of books) {
      bookshelf.push({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      });
    }
  }

  return bookshelf;
};

const getBook = (bookId) => {
  const book = books.find((book) => book.id === bookId);

  if (!book) throw new InvalidRequest(404, "Buku tidak ditemukan");

  return book;
};

const updateBook = (bookId, body) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = body;

  const updatedAt = new Date().toISOString();

  if (!name)
    throw new InvalidRequest(
      400,
      "Gagal memperbarui buku. Mohon isi nama buku"
    );

  if (readPage > pageCount)
    throw new InvalidRequest(
      400,
      "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    );

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1)
    throw new InvalidRequest(404, "Gagal memperbarui buku. Id tidak ditemukan");

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };

  return;
};

const deleteBook = (bookId) => {
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1)
    throw new InvalidRequest(404, "Buku gagal dihapus. Id tidak ditemukan");

  books.splice(bookIndex, 1);

  return;
};

export default {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
