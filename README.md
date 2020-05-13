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



This project is under heavy construction and is becoming a great thing...
