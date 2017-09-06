# ASP.NET INFERNO REDUX TUTORIAL 
My take on the whole ASP.NET Core plus SSR-enabled widget system built upon Inferno. The key criterias for this boilerplate/tutorial are as follow:
- Built upon ASP.NET Core plus, thus leveraging the strong backend framework built upon C#/.NET 
- Easy to implement API using ASP.NET MVC (I find it much easier to build an API using ASP.NET MVC than Node.js)
- Minimal client-side bundle
- SSR-enabled, dehydrating-supported widgeting system
- React-like syntax :). 

# How to run
npm i 
dotnet restore
dotnet run
???
profit

## Why widgeting and not SPA
The idea of this boilerplate is to support a common development scenario with the following feature:
- Generic multiple content pages website
- Client-side interaction with components handled by modern React-like Javascript Framework 

## Why Inferno 
- Much smaller runtime than React
- We're not trying to build a full-fledge SPA, so Inferno should work

## Technologies
- ASP.NET Core + NodeServices
- Inferno
- Redux
- Webpack

## POIs
- Widgets are stored under app/widgets 
- Widgets are automatically rendered into divs with matching ID defined in their respective widget's bindingId field (check Home view and Todos's bindingId)
- The widgets are rendered using the SSR-middleware in Middlewares folder (could use a lot of optimization)

...more to come :).
