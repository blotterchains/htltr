namespace hotel_tour_project;
using MySql.Data.MySqlClient;
public class Hotel:withDBS
{
    
    public int id=0;
    public string? name {get;set;}
    public string? loc {get;set;}
    public string? description {get;set;}
    public int star{get;set;}
    public DateTime submitdate=DateTime.Now;
}
