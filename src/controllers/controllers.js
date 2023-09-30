import Services from "../services/services.js";

const addBook = (request, h) => {
  try {
    const body = request.payload;

    const result = Services.addBook(body);

    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: result,
        },
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        status: error.status,
        message: error.message,
      })
      .code(error.code);
  }
};

const getBooks = (request, h) => {
  try {
    const query = request.query;

    const result = Services.getBooks(query);

    return h
      .response({
        status: "success",
        data: {
          books: result,
        },
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: error.status,
        message: error.message,
      })
      .code(error.code);
  }
};

const getBook = (request, h) => {
  try {
    const { bookId } = request.params;

    const result = Services.getBook(bookId);

    return h
      .response({
        status: "success",
        data: {
          book: result,
        },
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: error.status,
        message: error.message,
      })
      .code(error.code);
  }
};

const updateBook = (request, h) => {
  try {
    const { bookId } = request.params;
    const body = request.payload;

    Services.updateBook(bookId, body);

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: error.status,
        message: error.message,
      })
      .code(error.code);
  }
};

const deleteBook = (request, h) => {
  try {
    const { bookId } = request.params;

    Services.deleteBook(bookId);

    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: error.status,
        message: error.message,
      })
      .code(error.code);
  }
};

export default {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
