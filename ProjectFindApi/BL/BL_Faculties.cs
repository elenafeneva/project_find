using Newtonsoft.Json;
using ProjectFindApi.HelpModels;
using ProjectFindDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectFindApi.BL
{
    public class BL_Faculties
    {
        public async static Task<List<Faculties>> GetAutoCompleteFaculty(string Faculty)
        {
            string sql = $"SELECT * FROM [dbo].[Faculties] WHERE [FacultyName] LIKE N'%{Faculty}%' FOR JSON PATH";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Faculties> listFaculties = JsonConvert.DeserializeObject<List<Faculties>>(resp);
                return listFaculties;
            }
            else
            {
                List<Faculties> listFaculties = new List<Faculties>();
                return listFaculties;
            }
        }
        public async static Task<Faculties> GetFaculty(Faculties faculties)
        {
            string sql = $"SELECT * FROM [dbo].[Faculties] WHERE [Id]='{faculties.Id}' FOR JSON PATH";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Faculties> facultiesResp = JsonConvert.DeserializeObject<List<Faculties>>(resp);
                Faculties faculty = facultiesResp?.FirstOrDefault();
                return faculty;
            }
            else
            {
                return null;
            }
        }
        public async static Task<List<Faculties>> GetFaculties()
        {
            string sql = $"SELECT * FROM [dbo].[Faculties]  FOR JSON PATH";
            var resp = await DAL.ExecuteDataReader(sql);
            if (resp != "" || resp != "ERROR")
            {
                List<Faculties> facultiesResp = JsonConvert.DeserializeObject<List<Faculties>>(resp);
                return facultiesResp;
            }
            else
            {
                List<Faculties> facultiesResp = new List<Faculties>();
                return facultiesResp;
            }
        }
        public async static Task<bool> SaveFaculty(Faculties faculties)
        {
            string sql = $"INSERT INTO [dbo].[Faculties] ([FacultyName],[FacultyAddress]) VALUES (N'" + faculties.FacultyName + "' , N'" + faculties.FacultyAddress + "')";
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
    }
}
