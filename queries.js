//TASK 2
use plp_bookstore

// Find all books in a specific genre (e.g., Fiction)
db.books.find({ genre: "Fiction" }).pretty()

// Find books published after a certain year (e.g., 1950)
db.books.find({ published_year: { $gt: 1950 } }).pretty()

// Find books by a specific author (e.g., George Orwell)
db.books.find({ author: "George Orwell" }).pretty()

// Update the price of a specific book (e.g., The Great Gatsby)
db.books.updateOne(
    { title: "The Great Gatsby" },
    { $set: { price: 10.49 } }
)

// Delete a book by its title (e.g., The Catcher in the Rye)
db.books.deleteOne({ title: "The Catcher in the Rye" })

//TASK 3
// Find books that are both in stock and published after 2010
db.books.find({
    in_stock: true,
    published_year: { $gt: 2010 }
}).pretty()

// Use projection to return only title, author, and price
db.books.find(
    { in_stock: true },
    { title: 1, author: 1, price: 1, _id: 0 }
).pretty()

// Sort books by price (ascending)
db.books.find().sort({ price: 1 }).pretty()

// Sort books by price (descending)
db.books.find().sort({ price: -1 }).pretty()

// Pagination: 5 books per page, first page
db.books.find().limit(5).skip(0).pretty()

// Pagination: 5 books per page, second page
db.books.find().limit(5).skip(5).pretty()

//TASK 4
// Calculate average price of books by genre
db.books.aggregate([
    {
        $group: {
            _id: "$genre",
            averagePrice: { $avg: "$price" }
        }
    }
]).pretty()

// Find the author with the most books
db.books.aggregate([
    {
        $group: {
            _id: "$author",
            bookCount: { $sum: 1 }
        }
    },
    {
        $sort: { bookCount: -1 }
    },
    {
        $limit: 1
    }
]).pretty()

// Group books by publication decade and count them
db.books.aggregate([
    {
        $group: {
            _id: { $floor: { $divide: ["$published_year", 10] } },
            count: { $sum: 1 }
        }
    },
    {
        $sort: { _id: 1 }
    }
]).pretty()

// TASK 5
// Create an index on the title field
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Demonstrate performance with explain() - Query without index
db.books.find({ title: "The Great Gatsby" }).explain("executionStats")

// Demonstrate performance with index
db.books.find({ title: "The Great Gatsby" }).hint({ title: 1 }).explain("executionStats")

// Explain query for compound index
db.books.find({ author: "George Orwell", published_year: { $gt: 1940 } }).hint({ author: 1, published_year: 1 }).explain("executionStats")

