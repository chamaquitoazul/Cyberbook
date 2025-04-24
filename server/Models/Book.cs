using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("book")]
    public class BookModel
    {
        [Key]
        public int IdBook { get; set; }
        public string Title { get; set; }
        public string Synopsis { get; set; }
        public string AuthorName { get; set; }
        public DateTime PublicationYear { get; set; }
        public string LinkPDF { get; set; }

        public string LinkCover { get; set; }
        [ForeignKey("IdCategory")]
        public CategoryModel Category { get; set; }
    }
}
