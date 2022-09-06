using Newtonsoft.Json;
using ProjectFindApi.HelpModels;
using ProjectFindDatabase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ProjectFindDatabase.Helpers.Enumerations;

namespace ProjectFindApi.BL
{
    public class BL_Students
    {
        public async static Task<bool> SaveParticipaation(Users user,int projectId, string description)
        {
            string sql = $"INSERT INTO [dbo].[ProjectsStudents] (ID_Project,ID_Student,ApplyDescription) VALUES({projectId},{ user.Student_Id },N'{description}')";
            string resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        public async static Task<bool> DeleteParticipation(Users user, int projectId)
        {
            string sql = $"delete from [dbo].[ProjectsStudents] where [ID_Project]={projectId} and [ID_Student]={user.Student_Id}";
            string resp = await DAL.ExecuteDataReader(sql);
            if (resp != "ERROR")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async static Task<Students> GetStudent(string studentId)
        {
            string sql = $"select * from [dbo].[Students] where Id={studentId} FOR JSON PATH";
            string resp = await DAL.ExecuteDataReader(sql);
            List<Students> students = JsonConvert.DeserializeObject<List<Students>>(resp);
            return students.FirstOrDefault();
        }
        public async static Task<bool> UpdateStudent(Users user, Students student)
        {
            int gender = 1;
            if (user.Gender == Gender.Male) gender = (int)Gender.Male;
            string sql1 = $"UPDATE [dbo].[Users] SET [Email]=N'{user.Email}', [Gender]={gender} where [Id]={user.Id}";
            string resp1 = await DAL.ExecuteDataReader(sql1);
            string sql2 = $"UPDATE [dbo].[Students] SET [StartDateFax]=N'{student.StartDateFax}', [Faculty_Id]={student.Faculty_Id} , [Academy]=N'{student.Academy}', [AcademyName]=N'{student.AcademyName}', [Degree]=N'{student.Degree}',[StudentEmail]=N'{student.StudentEmail}',[Biography]=N'{student.Biography}' where [Id]={student.Id}";
            string resp2 = await DAL.ExecuteDataReader(sql2);
            if ((resp1 != "" || resp1 != "ERROR") && (resp2 != "" || resp2 != "ERROR"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }


    }
}
