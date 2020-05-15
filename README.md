![](https://i.ibb.co/5LPRwBJ/espresso.png)

deno minimal web freamework

# Getting Start
```javascript
import { Application } from "https://deno.land/x/espresso/mod.ts";
const app = new Application({ port : 80});

app.get("/", (context: any) => {
  context.send("Hello From Deno !");
});

app.start();
```


*This project is under heavy construction and is becoming a great thing...*

**We are very pleased with your cooperation**
**, If you are interested in working on Espresso project, here are some parts we need to implement and work on**



# TODO

### Web Framework :
- [ ] implement dynamic routes
- [ ] regex routes
- [ ] namespaced routes
- [ ] implement middlewares
- [ ] default security
- [ ] serve local files
- [ ] support proxies
- [ ] handle multipart/form-data
- [ ] support for template engines
- [ ] export context type
- [ ] error Handling
- [ ] logging
- [ ] validation

### community :
- [ ] init docs
- [ ] add examples
- [ ] add style guide
- [ ] add contributing guide
- [ ] specify directory structure

### website : 
- [ ] init website repo
- [ ] use espresso itself in website

## Our Roadmap :
- [ ] DATABASE integration
- [ ] Microservices
- [ ] MVC Pattern
- [ ] CLI Tool
- [ ] WEB SOCKETS
- [ ] GRAPHQL
- [ ] CRYPTO
- [ ] HELPERS
- [ ] TESTS

