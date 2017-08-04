using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using aspnet_inferno_redux_tut.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace aspnet_inferno_redux_tut.Controllers.ApiController
{
    [Route("api/[controller]")]
    public class TodosController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            return new List<Todo>
            {
                new Todo
                {
                    Id= 1,
                    Content= "test from api controller",
                    Completed= false
                }
            };
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
