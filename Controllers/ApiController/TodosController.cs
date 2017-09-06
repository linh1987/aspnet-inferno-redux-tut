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
    }
}
