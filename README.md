![](https://i.ibb.co/5LPRwBJ/espresso.png)

deno minimal web freamework

# Getting Start
```javascript
import { Application } from "https://deno.land/x/espresso/mod.ts";
const app = new Application();

app.get("/", context => {
  context.send("Hello From Deno !");
});

app.start(80)
```



This project is under construction and is becoming a greate thing
