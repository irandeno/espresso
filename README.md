![](https://i.ibb.co/5LPRwBJ/espresso.png)

deno minimal web framework

# Getting Started
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
**, If you are interested in working on Espresso project, here are some parts we need to implement and work**



# TODO

### Web Framework :
- [ ] implement dynamic routes
- [x] regex routes
- [ ] namespaced routes
- [ ] implement middlewares
- [ ] default security
- [ ] serve local files
- [ ] support proxies
- [ ] handle multipart/form-data
- [ ] support for template engines
- [ ] export context type
- [ ] error Handling
- [x] logging
- [ ] validation
- [ ] Testing Modules for all supported Features

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
- [ ] Database integration
- [ ] Microservices
- [ ] MVC Pattern
- [ ] CLI Tool
- [ ] Web Sockets
- [ ] GraphQL
- [ ] Crypto
- [ ] Helpers
- [ ] Tests

