using Microsoft.AspNetCore.Mvc;
using MovieWebsite.Models;
using System.Data.SqlClient;

namespace MovieWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        [HttpPost]
        public booking PostBooking(booking input)
        {
            try
            {
                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                string query = "insert into dbo.BOOKING_DETAILS (B_NAME,B_MNAME,B_PHONE,B_DATE,B_TIMING,B_TICKETS)" +
                    "values (@B_NAME,@B_MNAME,@B_PHONE,@B_DATE,@B_TIMING,@B_TICKETS)";




                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@B_NAME", input.B_NAME);
                cmd.Parameters.AddWithValue("@B_MNAME", input.B_MNAME);
                cmd.Parameters.AddWithValue("@B_PHONE", input.B_PHONE);
                cmd.Parameters.AddWithValue("@B_DATE", input.B_DATE);
                cmd.Parameters.AddWithValue("@B_TIMING", input.B_TIMING);
                cmd.Parameters.AddWithValue("@B_TICKETS", input.B_TICKETS);

                if (cmd.ExecuteNonQuery() == 1)
                {
                    return input;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return null;
        }

        [HttpGet]
        public List<booking> GetAll()
        {
            try
            {

                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                string query = "select * from BOOKING_DETAILS";



                SqlCommand cmd = new SqlCommand(query, connection);
                var a = cmd.ExecuteReader();
                if (a.HasRows)
                {
                    List<booking> bookings = new List<booking>();
                    booking book = null;
                    while (a.Read())
                    {
                        book = new booking();
                        book.B_ID = Convert.ToInt32(a["B_ID"]);
                        book.B_NAME = a["B_NAME"].ToString();
                        book.B_MNAME = a["B_MNAME"].ToString();
                        book.B_PHONE = a["B_PHONE"].ToString();
                        book.B_DATE = a["B_DATE"].ToString();
                        book.B_TIMING = a["B_TIMING"].ToString();
                        book.B_TICKETS = Convert.ToInt32(a["B_TICKETS"]);

                        bookings.Add(book);
                    }
                    return bookings;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return null;

        }
    }
}
