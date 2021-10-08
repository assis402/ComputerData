using System.Linq;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace ComputerData.Application.Utils
{
    public static class Utils
    {
        public static bool IsIP(this string value)
        {
            value = value.RemoveWhiteSpaces();
            value = Regex.Replace(value, "[.]", "");

            return value.All(char.IsDigit);
        }

        public static string RemoveWhiteSpaces(this string value)
        {
            return Regex.Replace(value, @"s", "");
        }

        public static string ConvertToJson(this object obj) => JsonSerializer.Serialize(obj, obj.GetType(), new JsonSerializerOptions() { WriteIndented = true, Encoder = System.Text.Encodings.Web.JavaScriptEncoder.Create(System.Text.Unicode.UnicodeRanges.All) });
    }
}