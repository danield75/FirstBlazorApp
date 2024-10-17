using System.ComponentModel.DataAnnotations;

namespace FirstBlazorApp.Models
{
	public class Grocery
	{
		[Required]
		[StringLength(15, ErrorMessage = "Name should be less than 15 characters.")]
		public string Name { get; set; }
		[Required]
		[Range(1, 10000, ErrorMessage = "Valid price range is between 1 and 10000.")]
		public float Price { get; set; }
	}
}
