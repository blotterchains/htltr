namespace hotel_tour_project;
using MySql.Data.MySqlClient;
public class Tour:withDBS
{
    
    public int id=0;
    public string? name {get;set;}
    public string? loc {get;set;}
    public string? description {get;set;}
    public string? start {get;set;}
    public string? end {get;set;}
    public int star{get;set;}
}
