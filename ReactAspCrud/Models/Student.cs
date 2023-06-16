using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactAspCrud.Models
{
    public class Student
    {
        [Key]
        public int id { get; set; }
        public string stname { get; set; }
        public string course { get; set; }
        public string gender { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone number must be 10 digits.")]
        public string phoneno { get; set; }
        [ForeignKey("CityId")]
        [Required]
        public int CityId { get; set; }
        [Required]
        [ForeignKey("StateId")]
        public int StateId { get; set; }
        
        [ForeignKey("CountryId")]
        [Required]
        public int CountryId { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string Role { get; set; }


    }
}
