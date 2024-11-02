import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    afterSignIn: "/pageForForms", // Задайте путь, куда перенаправлять после входа
    afterSignUp: "/pageForForms", // Или другой нужный путь после регистрации
  },
});
