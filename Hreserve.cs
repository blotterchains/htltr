namespace hotel_tour_project;
using MySql.Data.MySqlClient;
public class Hreserve:withDBS
{
    
    public int id=0;
    public int? hid {get;set;}
    public string? start {get;set;}
    public string? end {get;set;}
    public int uid{get;set;}
}
