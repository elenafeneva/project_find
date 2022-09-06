using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using ProjectFindApi.HelpModels;
using ProjectFindDatabase.Models;
using static ProjectFindDatabase.Helpers.Enumerations;

namespace ProjectFindApi.BL
{
    public class BL_Login
    {
        public async static Task<Users> Login(Users user)
        {
            try
            {
                string sql = $"SELECT * FROM [dbo].[Users] WHERE [Username] = '{user.Username}' AND [Password] = '{Cryptography.EncryptData(user.Password, user.Password)}' AND [Active]='1' FOR JSON PATH";
                string resp = await DAL.ExecuteDataReader(sql);
                if (resp != "" && resp!="ERROR" && resp!=null)
                {
                    Users U = JsonConvert.DeserializeObject<List<Users>>(resp).FirstOrDefault();
                    return U;
                }
                else
                {
                    return new Users();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new Users();
            }
        }

        public async static Task<string> SignUp(Users user, Students student, List<Skills> skillList)
        {
            //SAVE STUDENT 
            string resp1 = $"";
            int academy = 0;
            Students studentSaved = new Students();
            if (user.Company_Id == 0)
            {
                if (student.Academy == true) academy = 1;
                string sql1 = $"INSERT INTO[dbo].[Students] ([StartDateFax],[Faculty_Id],[Academy],[AcademyName],[GradeLevel],[Degree],[StudentEmail],[Biography]) VALUES('{student.StartDateFax}',{student.Faculty_Id},{academy},N'{student.AcademyName}',N'{student.GradeLevel}',N'{student.Degree}',N'{student.StudentEmail}',N'{student.Biography}')";
                resp1 = await DAL.ExecuteDataReader(sql1);
                if (resp1 != "" || resp1 != "ERROR")
                {
                    string sql = $"SELECT * FROM [dbo].[Students] WHERE [StudentEmail] = '{student.StudentEmail}' FOR JSON PATH";
                    string respStudent = await DAL.ExecuteDataReader(sql);
                    studentSaved = JsonConvert.DeserializeObject<List<Students>>(respStudent).FirstOrDefault();
                }
            }
            using (SqlConnection connection = new SqlConnection("Server=DESKTOP-6CLSA9B\\SQLEXPRESS;Database=ProjectFind;User Id=sa;Password=st0*st0;"))
                {
                connection.Open();

                SqlCommand command = connection.CreateCommand();
                SqlTransaction transaction;
                try
                {
                    transaction = connection.BeginTransaction("SampleTransaction");
                    command.Connection = connection;
                    command.Transaction = transaction;
                    string resp2 = $"";
                    string resp3 = $"";
                    int gender = 1;
                    if (user.Gender == Gender.Male) gender = (int)Gender.Male;
                    if (user.Company_Id == 0 && studentSaved?.Id>0)
                    {
                        //INSERT USER 
                        command.CommandText = $"INSERT INTO [dbo].[Users] ([Role],[Username],[Password],[Email],[Active],[Image],[Company_Id],[Gender],[Student_Id]) VALUES(3,N'{user.Username}',N'{Cryptography.EncryptData(user.Password, user.Password)}',N'{user.Email}',1,'{user.Image}',null,{gender},{studentSaved.Id})";
                        command.ExecuteNonQuery();
                        foreach (Skills skill in skillList)
                        {
                            command.CommandText = $"INSERT INTO [dbo].[StudentsSkills] ([ID_Student],[ID_Skill]) VALUES({studentSaved.Id},{skill.Id})";
                            command.ExecuteNonQuery();
                        }

                    }
                    else
                    {
                        command.CommandText = $"INSERT INTO [dbo].[Users] ([Role],[Username],[Password],[Email],[Active],[Image],[Company_Id],[Gender],[Student_Id]) VALUES(2,N'{user.Username}',N'{Cryptography.EncryptData(user.Password, user.Password)}',N'{user.Email}',1,'{user.Image}',{user.Company_Id},{gender},null)";
                        command.ExecuteNonQuery();

                    }
                    transaction.Commit();
                    return "200";
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    if (user.Company_Id == 0) { 
                        string sql = $"DELETE FROM [dbo].[Students] WHERE [Id] = '{studentSaved.Id}' FOR JSON PATH";
                        string respStudent = await DAL.ExecuteDataReader(sql);
                    }
                    return "400";
                }
            }
        }
    }
}
