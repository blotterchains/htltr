namespace hotel_tour_project;
using MySql.Data.MySqlClient;
public class Htype:withDBS
{
    
    public int id=0;
    public string? hid {get;set;}
    public int price{get;set;}
    public string? description{get;set;}
    public int start{get;set;}

}
