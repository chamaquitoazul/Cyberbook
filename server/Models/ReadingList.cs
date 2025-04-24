using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("reandinglist")]
    public class ReadingListModel
    {
        [Key]
        public int IdReadingList {  get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int IdCategory { get; set; }
        public Guid IdUser { get; set; }
    }
}
