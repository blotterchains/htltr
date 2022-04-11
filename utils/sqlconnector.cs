using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Web;
using Newtonsoft.Json;
using System.Data;
namespace hotel_tour_project;

public abstract class withDBS
{
    public string myConnectionString="Server=localhost;Database=htltr;User Id=root;Password=root;Convert Zero Datetime=True";

    private string[] hfetch={} ;
    // public String sqlDatoToJson(SqlDataReader dataReader)
    // {
    //     var dataTable = new DataTable();
    //     dataTable.Load(dataReader);
    //     string JSONString = string.Empty;
    //     JSONString = JsonConvert.SerializeObject(dataTable);
    //     return JSONString;
    // }

    // public object Upload(IFormFile file){
    //     _hosting
    //     return 0;
    // }
    public MySqlConnection Connection(){
        try
        {
            MySql.Data.MySqlClient.MySqlConnection conn;
            conn = new MySql.Data.MySqlClient.MySqlConnection();
            conn.ConnectionString = myConnectionString;
            conn.Open();
            return conn;
        }
        catch 
        {
            MySql.Data.MySqlClient.MySqlConnection connex;
            connex = new MySql.Data.MySqlClient.MySqlConnection();
            connex.Close();
            return connex;
        }
            }
    public object read(string table,string where=""){

        MySql.Data.MySqlClient.MySqlConnection conn=Connection();
        MySqlCommand cmd=conn.CreateCommand();
        if(where==""){
            cmd.CommandText="select * from "+table;
        }else{
            cmd.CommandText="select * from "+table+" where "+where;
        }
        System.Diagnostics.Debug.WriteLine("echo",cmd.CommandText);
        System.Diagnostics.Process.Start("echo",cmd.CommandText);
        MySqlDataReader reader=cmd.ExecuteReader();
        
        var dtbst=new DataTable();
        dtbst.Load(reader);
        string JSONString = string.Empty;
        JSONString = JsonConvert.SerializeObject(dtbst);
        conn.Close();
        return JSONString;
            // System.Diagnostics.Process.Start("echo",);
        
       
        
    }
    public int update(string table,string where,IFormCollection set){
//         UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition; 
        MySql.Data.MySqlClient.MySqlConnection conn=Connection();
        MySqlCommand cmd=conn.CreateCommand();
        cmd.CommandText="update "+table+" set ";

        foreach (var item in set)
        {
            cmd.CommandText+=item.Key+"='"+item.Value+"',";
        }
        cmd.CommandText=cmd.CommandText.TrimEnd(',');
        cmd.CommandText +=" where "+where;
        System.Diagnostics.Process.Start("echo",cmd.CommandText);
        try{
            int rt=cmd.ExecuteNonQuery();
        }catch{
            conn.Close();
            return 0;
        }
        
        conn.Close();
        return 1;
    }
    public int add(string table,IFormCollection Data,IDictionary<int,string> nulls,int len){
        MySql.Data.MySqlClient.MySqlConnection conn=Connection();
        MySqlCommand cmd=conn.CreateCommand();
        cmd.CommandText="insert into "+table+" values(";
        int lpt=0;     
         
        for (int lp=0;lp<=len;lp++)
        {
            // System.Diagnostics.Process.Start("echo",lp+":"+lpt+" "+Data.ElementAt(lpt).Key);  
            if(nulls.ContainsKey(lp)){
                if(nulls[lp]=="submitdate"){
                    cmd.CommandText+="default,";
                    continue;
                }else{
                    cmd.CommandText+="null,";
                    continue;
                }
                
            }
            string key=Data.ElementAt(lpt).Key;
            string value=Data.ElementAt(lpt).Value;
            
            cmd.CommandText+="'"+value+"',";
            
            lpt++;
        }
        cmd.CommandText=cmd.CommandText.TrimEnd(',')+")";
         System.Diagnostics.Process.Start("echo",cmd.CommandText);
        try{
            int rt=cmd.ExecuteNonQuery();
        }catch{
            conn.Close();
            return 1;
        }
        
        conn.Close();
        return 1;
    }
    public int delete(string table,string where){
        MySql.Data.MySqlClient.MySqlConnection conn=Connection();
        MySqlCommand cmd=conn.CreateCommand();
        cmd.CommandText="delete from "+table+" where ";
        cmd.CommandText +=where;
        System.Diagnostics.Process.Start("echo",cmd.CommandText);
        try{
            int rt=cmd.ExecuteNonQuery();
        }catch{
            conn.Close();
            return 0;
        }
        
        conn.Close();
        return 1;
    }
    }
