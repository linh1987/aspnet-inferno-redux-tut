using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.NodeServices;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace aspnet_inferno_redux_tut.Middlewares
{
    public class SSRMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly INodeServices _nodeServices;

        public SSRMiddleware(RequestDelegate next, INodeServices nodeServices)
        {
            _next = next;
            _nodeServices = nodeServices;
        }

        public async Task Invoke(HttpContext context)
        {
            var newContent = string.Empty;

            var existingBody = context.Response.Body;

            using (var newBody = new MemoryStream())
            {
                // We set the response body to our stream so we can read after the chain of middlewares have been called.
                context.Response.Body = newBody;

                await this._next(context);

                // Set the stream back to the original.
                context.Response.Body = existingBody;

                newBody.Seek(0, SeekOrigin.Begin);

                // newContent will be `Hello`.
                newContent = new StreamReader(newBody).ReadToEnd();

                //newContent = newContent.Replace("<!--app-->", MyAction();
                var renderedHtml = await _nodeServices.InvokeAsync<string>(SSRScriptPath.Path, "{\"todos\":[{\"id\":1,\"completed\":false,\"content\":\"asdasd\"}], \"editContent\": \"\"}");

                newContent = newContent.Replace("<!--app-->", renderedHtml);
                // Send our modified content to the response body.
                await context.Response.WriteAsync(newContent);
            }
        }
    }

    public static class SSRMiddlewaresExtensions
    {
        public static IApplicationBuilder UseSSRMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SSRMiddleware>();
        }
    }
}
