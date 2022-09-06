using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;


namespace ProjectFindApi.HelpModels
{
    public class Cryptography
    {
        private static TripleDESCryptoServiceProvider _tripleDes = new TripleDESCryptoServiceProvider();
        static Cryptography()
        {
            //_tripleDes.Key = TruncateHash("2kg4$3d%_sg@%!)fsq)$2@9$", _tripleDes.KeySize / 8);
            //_tripleDes.IV = TruncateHash(string.Empty, _tripleDes.BlockSize / 8);
        }
        private static byte[] TruncateHash(string key, int length)
        {

            var sha1 = new SHA1CryptoServiceProvider();

            // Hash the key.
            var keyBytes = System.Text.Encoding.Unicode.GetBytes(key);
            var hash = sha1.ComputeHash(keyBytes);

            // Truncate or pad the hash.
            Array.Resize(ref hash, length);
            return hash;
        }
        public static string EncryptData(string DESkey, string plaintext)
        {
            string ret = string.Empty;
            try
            {
                _tripleDes.Key = TruncateHash(DESkey, _tripleDes.KeySize / 8);
                _tripleDes.IV = TruncateHash(string.Empty, _tripleDes.BlockSize / 8);


                // Convert the plaintext string to a byte array.
                var plaintextBytes = System.Text.Encoding.Unicode.GetBytes(plaintext);

                // Create the stream.
                var ms = new System.IO.MemoryStream();
                // Create the encoder to write to the stream.
                var encStream = new CryptoStream(ms, _tripleDes.CreateEncryptor(), CryptoStreamMode.Write);

                // Use the crypto stream to write the byte array to the stream.
                encStream.Write(plaintextBytes, 0, plaintextBytes.Length);
                encStream.FlushFinalBlock();

                // Convert the encrypted stream to a printable string.
                ret = Convert.ToBase64String(ms.ToArray());
            }
            catch (Exception)
            {
                ret = "00000000";
            }
            return ret;
        }
        public static string DecryptData(string DESkey, string encryptedtext)
        {
            string ret = null;
            try
            {
                _tripleDes.Key = TruncateHash(DESkey, _tripleDes.KeySize / 8);
                _tripleDes.IV = TruncateHash(string.Empty, _tripleDes.BlockSize / 8);

                // Convert the encrypted text string to a byte array.
                var encryptedBytes = Convert.FromBase64String(encryptedtext);

                // Create the stream.
                var ms = new System.IO.MemoryStream();
                // Create the decoder to write to the stream.
                var decStream = new CryptoStream(ms, _tripleDes.CreateDecryptor(), CryptoStreamMode.Write);

                // Use the crypto stream to write the byte array to the stream.
                decStream.Write(encryptedBytes, 0, encryptedBytes.Length);
                decStream.FlushFinalBlock();

                // Convert the plaintext stream to a string.
                var l = ms.Length;

                ret = System.Text.Encoding.Unicode.GetString(ms.ToArray(), 0, Int32.Parse(l.ToString()));
            }
            catch (Exception)
            {
                ret = "00000000";
            }
            return ret;
        }
    }
}
