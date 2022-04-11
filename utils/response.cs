namespace hotel_tour_project;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
public class ResponseObj{
    public int status {get;set;}
    public object? result {get;set;}
}
public class Response
{
    private int status;
    public object? result;
    public Response(int sts,object descr){
        
        status=sts;
        result=JsonConvert.DeserializeObject<List<Dictionary<string,object>>>(descr.ToString());
        
    }
    public IEnumerable<ResponseObj> MakeRespError(){
        return Enumerable.Range(1, 1).Select(index => new ResponseObj
        {
            status=status,
            result=result,
        }).ToArray();
    }

}