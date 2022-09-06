using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProjectFindDatabase.Models;
using Newtonsoft.Json;
using ProjectFindApi.BL;
using ProjectFindApi.HelpModels;
using System.IO;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using static System.Net.Mime.MediaTypeNames;
using ProjectFindDatabase;
using System.Linq;

namespace ProjectFindApi.Controllers
{
    [ApiController]
    public class ProjectFindController : ControllerBase
    {
        [Route("projectfindapi/helloworld")]
        [HttpGet]
        public async Task<IActionResult> Hello()
        {
            return Ok($"ALIVEEE");
        }

        #region Login
        [HttpPut]
        [Route("projectfindapi/login")]
        public async Task<IActionResult> Login([FromBody] string value)
        {
            try
            {
                InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
                var ret = await BL_Login.Login(JsonConvert.DeserializeObject<Users>(inputBody.Podatoci));
                return Ok(ret);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("projectfindapi/signup")]
        public async Task<IActionResult> Signup([FromBody] string value)
        {
            try { 
            InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
            List<Skills> sillsList = JsonConvert.DeserializeObject<List<Skills>>(inputBody.Parametar);
            Students students = JsonConvert.DeserializeObject<Students>(inputBody.Podatoci);
            var ret = await BL_Login.SignUp(inputBody.Login, students, sillsList);
            return Ok(ret);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("projectfindapi/setnewpassword")]
        public async Task<IActionResult> SetNewPassword([FromBody] string value)
        {
            InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
            Users user = inputBody.Login;
            FindData fd = JsonConvert.DeserializeObject <FindData>(inputBody.Podatoci);
            var ret = await BL_Users.GetUser(user);
            if (ret != null)
            {
                bool retPassword = await BL_Users.SetNewPassword(user.Email,fd);
                if(retPassword==true)
                    return Ok(true);
                else
                    return BadRequest(false);
            }
            return BadRequest(false);
        }

        [HttpPost]
        [Route("projectfindapi/sendmailproject")]
        public async Task<IActionResult> SendMailStudentAndCloseProject([FromBody] string value)
        {
            InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
            Users user = inputBody.Login;
            List<Students> students = JsonConvert.DeserializeObject<List<Students>>(inputBody.Podatoci);
            string projectID = inputBody.Parametar;
            Projects project = await BL_Projects.GetProject(projectID);
            Companies company = await BL_Companies.GetCompany(project.Company_Id);
            await SendEmail.SendMailStudents(students, project,company);
            //CLOSE THE PROJECT
            bool resp=await BL_Projects.CloseProject(project.Id);
            return Ok(resp);
        }

        #endregion
         
        #region AutoComplete
        [HttpPost]
        [Route("projectfindapi/autocomplete/faculty")]
        public async Task<IActionResult> AutoComplete([FromBody] string value)
        {
            try
            {
             
                
                InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
                string Metod = inputBody.Metod;
                switch (Metod)
                {
                    case "Faculty":
                        {
                            var ret = await BL_Faculties.GetAutoCompleteFaculty(inputBody.Podatoci);
                            return Ok(ret);
                        }
                    default:
                        {
                            return Ok(new { Poraka = "Invalid Method" });
                        }

                }

            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Ok(null);
            }
        }
        #endregion

        #region Email
        [HttpPut]
        [Route("projectfindapi/changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] string value)
        {
            try {
            InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
            Users user = inputBody.Login;
            var ret = await BL_Users.GetUser(user);
            if (ret != null)
            {
                List<Users> users = new List<Users>();
                users.Add(ret);
                await SendEmail.SendMailAsync(users, true);
                return Ok(new { Poraka = true });
            }
            else
            {
                return Ok(new { Poraka = false });
            } }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { Poraka = false });
            }


            }
        #endregion

        #region CRUD CREATE,READ,UPDATE,DELETE
        [HttpPut]
        [Route("projectfindapi/selectmany")]
        public async Task<IActionResult> SelectMany([FromBody] string value)
        {
            try
            {
                InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
                string Metod = inputBody.Metod;

                switch (Metod)
                {
                    case "Skills":
                        {
                            var ret = await BL_Skills.GetSkills();
                            return Ok(ret);
                        }
                    case "Companies":
                        {
                            var ret = await BL_Companies.GetCompanies();
                            return Ok(ret);
                        }
                    case "CompanyUsers":
                        {
                            var ret = await BL_Users.GetCompanyUsers(inputBody.Login);
                            return Ok(ret);
                        }
                    case "Faculties":
                        {
                            var ret = await BL_Faculties.GetFaculties();
                            return Ok(ret);
                        }
                    case "Projects":
                        {
                            var ret = await BL_Projects.GetProjects(inputBody.Login);
                            return Ok(ret);
                        }
                    case "ProjectParticipatedStudents":
                        {
                            int projectId = Int32.Parse(inputBody.Podatoci);
                            var ret = await BL_Projects.GetProjectParticipatedStudents(projectId);
                            return Ok(ret);
                        }
                    case "ParticipatedProjects":
                        {
                            var ret = await BL_Projects.GetParticipatedProjects(inputBody.Login);
                            return Ok(ret);
                        }
                    case "ProjectsBySkills":
                        {
                            List<Skills> skills = JsonConvert.DeserializeObject<List<Skills>>(inputBody.Podatoci);
                            var ret = await BL_Projects.GetProjectsBySkills(skills, inputBody.Login);
                            return Ok(ret);
                        }
                        case "ParticipatedProjectsBySkills":
                        {
                            List<Skills> skills = JsonConvert.DeserializeObject<List<Skills>>(inputBody.Podatoci);
                            var ret = await BL_Projects.GetParticipatedProjectsBySkills(skills, inputBody.Login);
                            return Ok(ret);
                        }
                    case "StudentProjectSkills":
                        {
                            int studentId = Int32.Parse(inputBody.Podatoci);
                            var ret = await BL_Skills.GetStudentProjectSkills(studentId);
                            return Ok(ret);
                        }
                    case "SelectedSkillsProject":
                        {
                            int projectId = Int32.Parse(inputBody.Podatoci);
                            var ret = await BL_Skills.GetSelectedProjectSkills(projectId);
                            return Ok(ret);
                        }
                    default:
                    {
                        return Ok(new { Poraka = "Invalid Method" });
                    }
                }
                
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Ok(null);
            }
        }

        [HttpPut]
        [Route("projectfindapi/selectone")]
        public async Task<IActionResult> SelectOne([FromBody] string value){
            InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
            string Metod = inputBody.Metod;
            try
            {
                switch (Metod)
                {
                    case "Companies":
                        {
                            Companies company = JsonConvert.DeserializeObject<Companies>(inputBody.Podatoci);
                            var ret = await BL_Companies.GetCompany(company);
                            return Ok(ret);

                        }
                    case "Faculties":
                        {
                            Faculties faculty = JsonConvert.DeserializeObject<Faculties>(inputBody.Podatoci);
                            var ret = await BL_Faculties.GetFaculty(faculty);
                            return Ok(ret);
                        }
                    case "ProjectUserSkills":
                        { 
                            var ret = await BL_Projects.GetProjectUserSkills(inputBody.Podatoci);
                            return Ok(ret);
                        }
                    case "Student":
                        {
                            var ret = await BL_Students.GetStudent(inputBody.Podatoci);
                            return Ok(ret);
                        }
                    default:
                        {
                            return Ok(new { Poraka = "Invalid Method" });
                        }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("projectfindapi/savemany")]
        public async Task<IActionResult> SaveMany([FromBody] string value)
        {
            InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
            string Metod = inputBody.Metod;
            try
            {
                switch (Metod)
                {
                    case "Skills":
                        {
                            List<Skills> skills = JsonConvert.DeserializeObject<List<Skills>>(inputBody.Podatoci);
                            var ret = await BL_Skills.SaveStudentSkills(skills, inputBody.Parametar);
                            return Ok(ret);
                        }
                    default:
                        {
                            return Ok(new { Poraka = "Invalid Method" });
                        }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Ok(null);
            }
        }
        [HttpPut]
        [Route("projectfindapi/saveone")]
        public async Task<IActionResult> SaveOne([FromBody] string value)
        {
            InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
            string Metod = inputBody.Metod;
            try {
                switch (Metod)
                {
                    case "Faculties":
                        {
                            Faculties faculties = JsonConvert.DeserializeObject<Faculties>(inputBody.Podatoci);
                            var ret = await BL_Faculties.SaveFaculty(faculties);
                            return Ok(ret);
                        }
                    case "Skills":
                        {
                            Skills skill = JsonConvert.DeserializeObject<Skills>(inputBody.Podatoci);
                            var ret = await BL_Skills.SaveSkill(skill);
                            return Ok(ret);
                        }
                    case "Companies":
                        {
                            Companies company = JsonConvert.DeserializeObject<Companies>(inputBody.Podatoci);
                            var ret = await BL_Companies.SaveCompany(company);
                            return Ok(ret);
                        }
                    case "CompanyUsers":
                        {
                            Users user = JsonConvert.DeserializeObject<Users>(inputBody.Podatoci);
                            var ret = await BL_Users.SaveCompanyUser(user);
                            return Ok(ret);
                        }
                    case "Projects":
                        {
                            Projects project = JsonConvert.DeserializeObject<Projects>(inputBody.Podatoci);
                            List<Skills> projectSkills = JsonConvert.DeserializeObject<List<Skills>>(inputBody.Parametar);
                            var ret = await BL_Projects.SaveOneProject(inputBody.Login,project, projectSkills);
                            return Ok(ret);


                        }
                    case "StudentParticipation":
                        {
                            int projectId = Int32.Parse(inputBody.Podatoci);
                            string description = inputBody.Parametar;
                            var ret = await BL_Students.SaveParticipaation(inputBody.Login, projectId, description);
                            return Ok(ret);
                        }
                    default:
                        {
                            return Ok(new { Poraka = "Invalid Method" });
                        }
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Ok(null);
            }
        }

        [HttpPut]
        [Route("projectfindapi/editone")]
        public async Task<IActionResult> EditOne([FromBody] string value)
        {
            InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
            string Metod = inputBody.Metod;
            try
            {
                switch (Metod)
                {
                    case "Companies":
                        {
                            Companies company = JsonConvert.DeserializeObject<Companies>(inputBody.Podatoci);
                            var ret = await BL_Companies.UpdateCompany(company);
                            return Ok(ret);
                        }
                    case "Users":
                        {
                            Users user = JsonConvert.DeserializeObject<Users>(inputBody.Podatoci);
                            var ret = await BL_Users.UpdateUser(user);
                            return Ok(ret);
                        }
                    case "Students":
                        {
                            Students student = JsonConvert.DeserializeObject<Students>(inputBody.Podatoci);
                            Users user = JsonConvert.DeserializeObject<Users>(inputBody.Parametar);
                            var ret = await BL_Students.UpdateStudent(user, student);
                            return Ok(ret);
                        }
                    default:
                        {
                            return Ok(new { Poraka = "Invalid Method" });
                        }

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(null);
            }

        }

        [HttpPut]
        [Route("projectfindapi/deleteone")]
        public async Task<IActionResult> DeleteOne([FromBody] string value)
        {
            InputBody inputBody = JsonConvert.DeserializeObject<InputBody>(value);
            string Metod = inputBody.Metod;
            try
            {
                switch (Metod)
                {
                    case "Companies":
                        {
                            Companies company = JsonConvert.DeserializeObject<Companies>(inputBody.Podatoci);
                            var ret = await BL_Companies.DeleteCompany(company);
                            return Ok(ret);
                        }
                    case "CompanyUsers":
                        {
                            Users user = JsonConvert.DeserializeObject<Users>(inputBody.Podatoci);
                            var ret = await BL_Users.DeleteUser(user);
                            return Ok(ret);
                        }
                    case "StudentUnParticipate":
                        {
                            int projectId = Int32.Parse(inputBody.Podatoci);
                            var ret = await BL_Students.DeleteParticipation(inputBody.Login, projectId);
                            return Ok(ret);
                        }
                    default:
                        {
                            return Ok(new { Poraka = "Invalid Method" });
                        }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(null);
            }
        }

        #endregion

        #region Image
        [HttpPost]
        [Route("projectfindapi/files/imageset")]
        public async Task<IActionResult> UploadImageAsync(string token)
        {
            string ret = "";
            try
            {
                var Files = Request.Form.Files;
                for (int index = 0; index < Files.Count; index++)
                {
                    var file = Files[index];
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            string FileName = Path.GetFileName(file.FileName);
                            file.CopyTo(ms);
                            var fileBytes = ms.ToArray();
                            //var nesto = new byte[Convert.ToInt32(fileBytes.Length)];
                            string sql1 = $"DELETE FROM [dbo].[Images] WHERE [User_Id]={token}";
                            string resp1 = await DAL.ExecuteDataReader(sql1);

                            string sql2 = $"INSERT INTO [dbo].[Images] ([FileName],[Image],[User_Id]) VALUES (N'{FileName}',{"0x" + BitConverter.ToString(fileBytes).Replace("-", "")}, {token})";
                            string resp2 = await DAL.ExecuteDataReader(sql2);


                            return Ok(resp2);
                        }
                    }
                    else
                        return BadRequest(null);
                }

                return BadRequest(null);
            }
            catch (Exception ex)
            {
                return Ok(null);
            }
        }
        [HttpPost]
        [Route("projectfindapi/files/imagesetcompany")]
        public async Task<IActionResult> UploadImageAsyncCompany(string token)
        {
            string ret = "";
            try
            {
                var Files = Request.Form.Files;
                for (int index = 0; index < Files.Count; index++)
                {
                    var file = Files[index];
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            string FileName = Path.GetFileName(file.FileName);
                            file.CopyTo(ms);
                            var fileBytes = ms.ToArray();
                            //var nesto = new byte[Convert.ToInt32(fileBytes.Length)];
                            string sql1 = $"DELETE FROM [dbo].[Images] WHERE [Company_Id]={token}";
                            string resp1 = await DAL.ExecuteDataReader(sql1);

                            string sql = $"INSERT INTO [dbo].[Images] ([FileName],[Image],[Company_Id]) VALUES (N'{FileName}',{"0x" + BitConverter.ToString(fileBytes).Replace("-", "")}, {token})";
                            string resp = await DAL.ExecuteDataReader(sql);


                            return Ok(resp);
                        }
                    }
                    else
                        return BadRequest(null);
                }

                return BadRequest(null);
            }
            catch (Exception ex)
            {
                return Ok(null);
            }
        }
        [HttpPut]
        [Route("projectfindapi/files/imageget")]
        public async Task<IActionResult> DownloadImageAsync([FromBody] string value)
        {
            try
            {
                var inputBody = Newtonsoft.Json.JsonConvert.DeserializeObject<InputBody>(value);
                string sql = $"select * from [dbo].[Images] where[User_Id] = {inputBody.Podatoci} FOR JSON PATH";
                string ret = await DAL.ExecuteDataReader(sql);
                if (ret != "ERROR" && ret != "")
                {
                    List<Images> images = JsonConvert.DeserializeObject<List<Images>>(ret);
                    byte[] bytes = images.FirstOrDefault().Image;
                    string base64 = System.Convert.ToBase64String(bytes);
                    return Ok(new { Image = $"data:image/jpeg;base64,{ base64 }" });
                }
                else
                    return Ok(null);

            }

            catch (Exception ex)
            {
                return BadRequest(new { Poraka = "" });
            }
        }
        [HttpPut]
        [Route("projectfindapi/files/imagegetcompany")]
        public async Task<IActionResult> DownloadImageAsyncCompany([FromBody] string value)
        {
            try
            {
                var inputBody = Newtonsoft.Json.JsonConvert.DeserializeObject<InputBody>(value);
                string sql = $"select * from [dbo].[Images] where[Company_Id] = {inputBody.Podatoci} FOR JSON PATH";
                string ret = await DAL.ExecuteDataReader(sql);
                if (ret != "ERROR" && ret != "")
                {
                    List<Images> images = JsonConvert.DeserializeObject<List<Images>>(ret);
                    byte[] bytes = images.FirstOrDefault().Image;
                    string base64 = System.Convert.ToBase64String(bytes);
                    return Ok(new { Image = $"data:image/jpeg;base64,{ base64 }" });
                }
                else
                    return Ok(null);

            }

            catch (Exception ex)
            {
                return BadRequest(new { Poraka = "" });
            }
        }
        #endregion

        #region Dashboard
        [Route("projectfindapi/companiesnumber")]
        [HttpGet]
        public async Task<IActionResult> GetCompaniesNumber()
        {
            var ret = await BL_Dashboard.GetCompaniesNumber();
            return Ok(new { Number = ret });
        }
        [Route("projectfindapi/studentsnumber")]
        [HttpGet]
        public async Task<IActionResult> GetStudentsNumber()
        {
            var ret = await BL_Dashboard.GetStudentsNumber();
            return Ok(new { Number = ret });
        }
        [Route("projectfindapi/projectsnumber")]
        [HttpGet]
        public async Task<IActionResult> GetProjectsNumber()
        {
            var ret = await BL_Dashboard.GetProjectsNumber();
            return Ok(new { Number = ret });
        }
        [Route("projectfindapi/projectsclosednumber")]
        [HttpGet]
        public async Task<IActionResult> GetProjectsCloosedNumber()
        {
            var ret = await BL_Dashboard.GetProjectsClosedNumber();
            return Ok(ret);
        }
        [Route("projectfindapi/companiesprojectnumber")]
        [HttpGet]
        public async Task<IActionResult> GetCompaniesProjectsNumber()
        {
            var ret = await BL_Dashboard.GetCompaniesProjectsNumber();
            return Ok(ret);
        }
        [Route("projectfindapi/top5skills")]
        [HttpGet]
        public async Task<IActionResult> GetTopSkills()
        {
            var ret = await BL_Dashboard.GetTopSkills();
            return Ok(ret);
        }
        #endregion

    }
}
