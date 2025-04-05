using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        // GET: /api/Books?pageSize=5&pageNum=1&category=Action&category=Biography
        [HttpGet]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? category = null)
        {
            var query = _context.Books.AsQueryable();

            if (category != null && category.Any())
            {
                query = query.Where(b => category.Contains(b.Category));
            }

            var totalCount = query.Count();

            var pagedBooks = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                Books = pagedBooks,
                TotalCount = totalCount
            };

            return Ok(result);
        }

        // GET: /api/Books/GetCategoryTypes
        [HttpGet("GetCategoryTypes")]
        public IActionResult GetCategoryTypes()
        {
            var categories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(categories);
        }

        [HttpPost("Add")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookID);
            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _context.Books.Find(bookID);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
