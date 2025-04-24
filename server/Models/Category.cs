using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("category")]
    public class CategoryModel
    {
        [Key]
        public int IdCategory { get; set; }
        public string CategoryName { get; set; }
    }
}