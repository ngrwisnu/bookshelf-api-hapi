import Controllers from "../controllers/controllers.js";

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: Controllers.addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: Controllers.getBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: Controllers.getBook,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: Controllers.updateBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: Controllers.deleteBook,
  },
];

export default routes;
