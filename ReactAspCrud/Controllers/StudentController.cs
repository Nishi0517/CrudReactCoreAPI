using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAspCrud.Models;
using ReactAspCrud.ViewModel;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace ReactAspCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentDbContext _studentDbContext;

        public StudentController(StudentDbContext studentDbContext)
        {
            _studentDbContext = studentDbContext;
        }

        [HttpGet]
        [Route("GetCountry")]
        public JsonResult GetCountries()
        {
            var countries = _studentDbContext.Countries.OrderBy(x => x.CountryName).ToList();
            return new JsonResult(countries);
        }
        [HttpGet]
        [Route("GetStates")]
        public async Task<IActionResult> GetStates(int id)
        {
            var states = await _studentDbContext.States.Where(x => x.CountryId == id).OrderBy(x => x.StateName).ToListAsync();
            return Ok(states);
        }

        [HttpGet]
        [Route("GetCities/{stateId}")]
        public async Task<IActionResult> GetCities(int stateId)
        {
            var cities = await _studentDbContext.Cities.Where(c => c.StateId == stateId).ToListAsync();
            return Ok(cities);
        }

        [HttpGet]
        [Route("GetStudent")]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            var studentlist = _studentDbContext.Student.ToList();
            return studentlist;

            //can also do this
            //return await _studentDBContext.STudent.ToListAsync();

        }
        //[HttpPost]
        //[Route("Login")]
        //public IActionResult Login(LoginVM model)
        //{
        //    var student = _studentDbContext.Student.FirstOrDefault(x => x.email == model.email);
        //    if (student != null)
        //    {
        //        if (student.password == model.password)
        //        {
        //            return Ok("Login successful");
        //        }
        //        else
        //        {
        //            return BadRequest("Invalid password");
        //        }
        //    }
        //    else
        //    {
        //        return BadRequest("Invalid email");
        //    }
        //}
       
        [HttpPost]
        [Route("Login")]
        public JsonResult Login(LoginVM model)
        {
            var student = _studentDbContext.Student.FirstOrDefault(x => x.email == model.email);
            if (student != null)
            {
                if (student.password == model.password && student.Role==model.Role)
                {
                    return new JsonResult(new { role=model.Role,status = 200,success = true, message = "Login successful" });
                }
                else
                {
                    return new JsonResult(new { status = 400,success = false, message = "Invalid password" });
                }
            }
            else
            {
                return new JsonResult(new { status = 500,success = false, message = "Invalid email" });
            }
        }


        //[HttpPost]
        //[Route("Login")]
        //public string Login(LoginVM model)
        //{
        //    string msg = string.Empty;
        //    var student = _studentDbContext.Student.FirstOrDefault(x => x.email == model.email);
        //    if (student != null)
        //    {
        //        if (student.password == model.password)
        //        {
        //            msg = "ok";
        //        }
        //        else
        //        {
        //            //return BadRequest(new { success = false, message = "Invalid password" });
        //            msg = "password wrong";
        //        }
        //    }
        //    else
        //    {
        //        //return BadRequest(new { success = false, message = "Invalid email" });
        //        msg = "email wrong";
        //    }
        //    return msg;
        //}

        //[HttpPost]
        //[Route("AddStudent")]
        //public async Task<Student> AddStudent(Student objStudent)
        //{


        //    _studentDbContext.Student.Add(objStudent);
        //    await _studentDbContext.SaveChangesAsync();
        //    return objStudent;
        //}
        [HttpPost]
        [Route("AddStudent")]
        public async Task<IActionResult> AddStudent(Student objStudent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _studentDbContext.Student.Add(objStudent);
            await _studentDbContext.SaveChangesAsync();
            return Ok(objStudent);
        }
        //[HttpPatch]
        //[Route("UpdateStudent/{id}")]
        //public async Task<Student> UpdateStudent(Student objStudent)
        //{
        //    //var student = _studentDbContext.Student.Where(x => x.id == id).FirstOrDefault();
        //    //return student;
        //    _studentDbContext.Entry(objStudent).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        //    await _studentDbContext.SaveChangesAsync();
        //    return objStudent;
        //}
        [HttpPatch]
        [Route("UpdateStudent/{id}")]
        public async Task<IActionResult> UpdateStudent(Student objStudent)
        {
            //var student = _studentDbContext.Student.Where(x => x.id == id).FirstOrDefault();
            //return student;
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _studentDbContext.Entry(objStudent).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _studentDbContext.SaveChangesAsync();
            return Ok(objStudent);
        }
        [HttpDelete]
        [Route("DeleteStudent/{id}")]
        public bool DeleteStudent(int id)
        {
            bool a = false;
            var student = _studentDbContext.Student.Find(id);
            if (student != null)
            {
                a = true;
                _studentDbContext.Student.Remove(student);
                _studentDbContext.SaveChangesAsync();
            }
            else
            {
                a = false;
            }

            return a;
        }
    }
}
