using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieWebsite.Models;
using System.Data.SqlClient;

namespace MovieWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        [HttpGet]
        public List<movie> GetAll()
        {
            try
            {

                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                string query = "select * from MOVIES";



                SqlCommand cmd = new SqlCommand(query, connection);
                var a = cmd.ExecuteReader();
                if (a.HasRows)
                {
                    List<movie> movies = new List<movie>();
                    movie movie = null;
                    while (a.Read())
                    {
                        movie = new movie();
                        movie.M_ID = Convert.ToInt32(a["M_ID"]);
                        movie.M_NAME = a["M_NAME"].ToString();
                        movie.M_DESC = a["M_DESC"].ToString();
                        movie.M_IMAGE = a["M_IMAGE"].ToString();
                        movie.M_RATING = a["M_RATING"].ToString();
                        movie.MORN_SEATS = a["MORN_SEATS"].ToString();
                        movie.NOON_SEATS = a["NOON_SEATS"].ToString();
                        movie.NIGHT_SEATS = a["NIGHT_SEATS"].ToString();
                        movie.M_PRICE = Convert.ToInt32(a["M_PRICE"]);

                        movies.Add(movie);
                    }
                    return movies;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return null;

        }

        [HttpPost]
        public movie PostMovie(movie input)
        {
            try
            {
                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                //string query = "insert into dbo.PAYMENT (P_CARDHOLDER_NAME,P_CARD_NO,P_CARD_TYPE,P_EXPIRY,P_CVV) values('" + input.P_CARDHOLDER_NAME + @"','" + input.P_CARD_NO + @"','" + input.P_CARD_TYPE + @"','" + input.P_EXPIRY + @"','" + input.P_CVV + @"')";
                string query = "insert into dbo.MOVIES (M_NAME,M_DESC,M_IMAGE,M_RATING,MORN_SEATS,NOON_SEATS,NIGHT_SEATS,M_PRICE)" +
                    "values (@M_NAME,@M_DESC,@M_IMAGE,@M_RATING,@MORN_SEATS,@NOON_SEATS,@NIGHT_SEATS,@M_PRICE)";




                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@M_NAME", input.M_NAME);
                cmd.Parameters.AddWithValue("@M_DESC", input.M_DESC);
                cmd.Parameters.AddWithValue("@M_IMAGE", input.M_IMAGE);
                cmd.Parameters.AddWithValue("@M_RATING", input.M_RATING);
                cmd.Parameters.AddWithValue("@MORN_SEATS", input.MORN_SEATS);
                cmd.Parameters.AddWithValue("@NOON_SEATS", input.NOON_SEATS);
                cmd.Parameters.AddWithValue("@NIGHT_SEATS", input.NIGHT_SEATS);
                cmd.Parameters.AddWithValue("@M_PRICE", input.M_PRICE);

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

        [HttpGet("{id}")]

        public movie getSpecificMovie(int id)
        {
            try
            {
                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                //string query = "insert into dbo.PAYMENT (P_CARDHOLDER_NAME,P_CARD_NO,P_CARD_TYPE,P_EXPIRY,P_CVV) values('" + input.P_CARDHOLDER_NAME + @"','" + input.P_CARD_NO + @"','" + input.P_CARD_TYPE + @"','" + input.P_EXPIRY + @"','" + input.P_CVV + @"')";
                string query = $"select * from MOVIES where M_ID={id}";

                SqlCommand cmd = new SqlCommand(query, connection);
                var a = cmd.ExecuteReader();
                if (a.HasRows)
                {

                    if (a.Read())
                    {
                        movie movie = new movie();
                        movie.M_ID = Convert.ToInt32(a["M_ID"]);
                        movie.M_NAME = a["M_NAME"].ToString();
                        movie.M_DESC = a["M_DESC"].ToString();
                        movie.M_IMAGE = a["M_IMAGE"].ToString();
                        movie.M_RATING = a["M_RATING"].ToString();
                        movie.MORN_SEATS = a["MORN_SEATS"].ToString();
                        movie.NOON_SEATS = a["NOON_SEATS"].ToString();
                        movie.NIGHT_SEATS = a["NIGHT_SEATS"].ToString();
                        movie.M_PRICE = Convert.ToInt32(a["M_PRICE"]);
                        return movie;

                    }

                }
            }
            catch (Exception)
            {
                throw;
            }


            return null;



        }
        [HttpPut]
        public movie updateBicycle(movie movie)
        {
            try
            {
                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");




                connection.Open();



                string query = $"update MOVIES set MORN_SEATS='{movie.MORN_SEATS}', NOON_SEATS='{movie.NOON_SEATS}', NIGHT_SEATS='{movie.NIGHT_SEATS}' where M_ID={movie.M_ID}";


                SqlCommand cmd = new SqlCommand(query, connection);



                var a = cmd.ExecuteReader();
                if (a.HasRows && a.Read())
                    return movie;



            }
            catch (Exception)
            {



                throw;
            }
            return null;
        }

    }
}
    

