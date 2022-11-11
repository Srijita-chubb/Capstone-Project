using Microsoft.AspNetCore.Mvc;
using MovieWebsite.Models;
using System.Data.SqlClient;

namespace MovieWebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //[HttpGet(Name = "GetWeatherForecast")]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = Random.Shared.Next(-20, 55),
        //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}
        
        [HttpGet]
        public List<Student> GetAll()
        {
            try
            {

                SqlConnection connection = new SqlConnection("Server=APINP-ELPT83700\\SQLEXPRESS;Database=movies;Integrated Security=false;User Id=sa;Password=guvi;");


                connection.Open();
                string query = "select * from student";



                SqlCommand cmd = new SqlCommand(query, connection);
                var a = cmd.ExecuteReader();
                if (a.HasRows)
                {
                    List<Student> students = new List<Student>();
                    Student student = null;
                    while (a.Read())
                    {
                        student = new Student();
                        student.id = a["student_id"].ToString();
                        student.name = a["student_name"].ToString();
                        student.dept = a["student_dept"].ToString();



                        students.Add(student);
                    }
                    return students;
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