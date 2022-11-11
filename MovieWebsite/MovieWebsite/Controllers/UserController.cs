using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieWebsite.Models;
using System.Data.SqlClient;

namespace MovieWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost]
        public List<User> PostAll(User input)
        {
            try
            {
                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                string query = "insert into dbo.USER_DETAILS (U_NAME,U_PHONENO,U_MAILID,U_PASSWORD) values('" + input.U_NAME + @"','" + input.U_PHONENO + @"','" + input.U_MAILID + @"','" + input.U_PASSWORD + @"')";



                SqlCommand cmd = new SqlCommand(query, connection);
                var a = cmd.ExecuteReader();
                if (a.HasRows)
                {
                    List<User> users = new List<User>();
                    User user = null;
                    while (a.Read())
                    {
                        user = new User();
                        user.U_ID = Convert.ToInt32(a["id"]);
                        user.U_NAME = a["name"].ToString();
                        user.U_PHONENO = a["phone"].ToString();
                        user.U_MAILID = a["mail"].ToString();
                        user.U_PASSWORD = a["password"].ToString();

                        users.Add(user);
                    }
                    return users;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        public List<User> GetUser()
        {
            try
            {

                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                string query = "select * from USER_DETAILS";



                SqlCommand cmd = new SqlCommand(query, connection);
                var a = cmd.ExecuteReader();
                if (a.HasRows)
                {
                    List<User> all_data = new List<User>();
                    User users = null;
                    while (a.Read())
                    {
                        users = new User();
                        users.U_ID = Convert.ToInt32(a["U_ID"]);
                        users.U_NAME = a["U_NAME"].ToString();
                        users.U_PHONENO = a["U_PHONENO"].ToString();
                        users.U_MAILID = a["U_MAILID"].ToString();
                        users.U_PASSWORD = a["U_PASSWORD"].ToString();

                        all_data.Add(users);
                    }
                    return all_data;
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
