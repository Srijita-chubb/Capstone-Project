using Microsoft.AspNetCore.Mvc;
using MovieWebsite.Models;
using System.Data.Common;
using System.Data.SqlClient;
using System.Transactions;

namespace MovieWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : Controller
    {
        [HttpPost]
        public payment PostPayment(payment input)
        {
            try
            {
                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                //string query = "insert into dbo.PAYMENT (P_CARDHOLDER_NAME,P_CARD_NO,P_CARD_TYPE,P_EXPIRY,P_CVV) values('" + input.P_CARDHOLDER_NAME + @"','" + input.P_CARD_NO + @"','" + input.P_CARD_TYPE + @"','" + input.P_EXPIRY + @"','" + input.P_CVV + @"')";
                string query = "insert into dbo.PAYMENT (P_CARDHOLDER_NAME,P_CARD_NO,P_CARD_TYPE,P_EXPIRY,P_CVV,P_AMOUNT)" +
                    "values (@P_CARDHOLDER_NAME,@P_CARD_NO,@P_CARD_TYPE,@P_EXPIRY,@P_CVV,@P_AMOUNT)";




                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@P_CARDHOLDER_NAME", input.P_CARDHOLDER_NAME);
                cmd.Parameters.AddWithValue("@P_CARD_NO", input.P_CARD_NO);
                cmd.Parameters.AddWithValue("@P_CARD_TYPE", input.P_CARD_TYPE);

                cmd.Parameters.AddWithValue("@P_EXPIRY", input.P_EXPIRY);
                cmd.Parameters.AddWithValue("@P_CVV", input.P_CVV);
                cmd.Parameters.AddWithValue("@P_AMOUNT", input.P_AMOUNT);




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
        public List<payment> GetPayment()
        {
            try
            {

                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movie_website;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                string query = "select * from PAYMENT";



                SqlCommand cmd = new SqlCommand(query, connection);
                var a = cmd.ExecuteReader();
                if (a.HasRows)
                {
                    List<payment> pays = new List<payment>();
                    payment pay = null;
                    while (a.Read())
                    {
                        pay = new payment();
                        pay.P_ID = Convert.ToInt32(a["P_ID"]);
                        pay.P_CARDHOLDER_NAME = a["P_CARDHOLDER_NAME"].ToString();
                        pay.P_CARD_NO = a["P_CARD_NO"].ToString();
                        pay.P_CARD_TYPE = a["P_CARD_TYPE"].ToString();
                        pay.P_EXPIRY = a["P_EXPIRY"].ToString();
                        pay.P_CVV = Convert.ToInt32(a["P_CVV"]);
                        pay.P_AMOUNT = Convert.ToInt32(a["P_AMOUNT"]);

                        pays.Add(pay);
                    }
                    return pays;
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