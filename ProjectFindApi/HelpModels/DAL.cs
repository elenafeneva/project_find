using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace ProjectFindApi.HelpModels
{
    public class DAL
    {
        public static async Task<string> ExecuteScallar(string sql)
        {
            StringBuilder stringBuilder = new StringBuilder();
            try
            {
                using (var connection = new SqlConnection(Global.appSettings.ConnectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(sql, connection);
                    var scalar = await command.ExecuteScalarAsync();
                    return scalar.ToString();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "ERROR";
            }
        }
        public static async Task<string> ExecuteInOneTransaction(string sql1, string sql2, string sql3)
        {
            //SQL1 - Save Student
            //SQL2 - Save User 
            //SQL3 - Save Skills and Student
            try
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    using (var connection = new SqlConnection(Global.appSettings.ConnectionString))
                    {
                        connection.Open();
                        //SQL1
                        SqlCommand command = new SqlCommand(sql1, connection);
                        var scalar = await command.ExecuteScalarAsync();

                        //SQL2
                        command = new SqlCommand(sql2, connection);
                        scalar = await command.ExecuteScalarAsync();

                        //SQL3
                        command = new SqlCommand(sql3, connection);
                        scalar = await command.ExecuteScalarAsync();

                        return scalar.ToString();

                        ts.Complete();
                        connection.Close();

                    } 
                }
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message);
                return "ERROR";
            }
        }       
        public static async Task<string> ExecuteDataReader(string sql)
        {
            StringBuilder stringBuilder = new StringBuilder();
            try
            {
                using (var connection = new SqlConnection("Server=DESKTOP-6CLSA9B\\SQLEXPRESS;Database=ProjectFind;User Id=sa;Password=st0*st0;"))
                {
                    connection.Open();
                    SqlCommand command = new(sql, connection);
                    using SqlDataReader reader = await command.ExecuteReaderAsync();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            stringBuilder.Append(reader[0].ToString());
                        }
                    }
                    command.Dispose();
                }
                return stringBuilder.ToString();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "ERROR";
            }
        }
        public static async Task<string> ExecuteStoreProcedure(string procedureName)
        {
            StringBuilder stringBuilder = new StringBuilder();
            try
            {
                using (var connection = new SqlConnection("Server=DESKTOP-6CLSA9B\\SQLEXPRESS;Database=ProjectFind;User Id=sa;Password=st0*st0;"))
                {
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand($"{procedureName}", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        using SqlDataReader reader = await cmd.ExecuteReaderAsync();
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                stringBuilder.Append(reader[0].ToString());
                            }
                        }
                        cmd.Dispose();

                    return stringBuilder.ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "ERROR";
            }
        }
        public static async Task<string> ExecuteNonQuery(string sql)
        {
            int rowsAffected = 0;
            try
            {
                using (var connection = new SqlConnection(Global.appSettings.ConnectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(sql, connection);
                    rowsAffected = await command.ExecuteNonQueryAsync();
                }
                return $"{rowsAffected}";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "ERROR";
            }
        }
    }
}
