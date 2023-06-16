using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactAspCrud.Models;
using ReactAspCrud.ViewModel;

namespace ReactAspCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly StudentDbContext _studentDbContext;

        public AdminController(StudentDbContext studentDbContext)
        {
            _studentDbContext = studentDbContext;
        }
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IEnumerable<Student>> GetAllUsers()
        {
            var studentlist = _studentDbContext.Student.ToList();
            return studentlist;


        }
        [HttpPost]
        [Route("FetchPasswordById")]
        public string FetchPasswordById(LoginVM model)
        {
            string password = string.Empty;
            var user = _studentDbContext.Student.FirstOrDefault(x=>x.id==model.id);
            if (user != null)
            {
                password ="User email is : " + user.email + " & password is : " + user.password;
            }
            return password;
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


    }
}
