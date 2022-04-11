namespace hotel_tour_project;
using MySql.Data.MySqlClient;
public class User:withDBS
{
    
    public int id=0;
    public string? name {get;set;}
    public string? pass {get;set;}
    public string? email {get;set;}
}
