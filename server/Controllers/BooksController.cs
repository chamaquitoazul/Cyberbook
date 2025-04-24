using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BooksController
    {
        private readonly ILogger<AuthController> _logger;
        private readonly DbInstance _db;

        public BooksController(ILogger<AuthController> logger, DbInstance db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllBooks()
        {
            _logger.LogInformation("Attempting to get all books");
            var books = await _db.Books
            .Select(book => new
            {
                book.IdBook,
                book.Title,
                book.Synopsis,
                book.AuthorName,
                PublicationYear = book.PublicationYear.Year,
                book.LinkPDF,
                book.LinkCover,
                book.Category.CategoryName,
                genres = _db.BookGenres
                        .Where(bg => bg.IdBook == book.IdBook)
                        .Select(bg => bg.Genre.GenreName)
                        .ToList()
            })
            .ToListAsync();
            _logger.LogInformation("There are {count} books.", books.Count);
            return JSend.Success(books);
        }
    }
}