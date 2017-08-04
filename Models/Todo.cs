using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace aspnet_inferno_redux_tut.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public bool Completed { get; set; }
    }
}
