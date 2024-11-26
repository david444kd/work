import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    afterSignIn: "/form-page", // Задайте путь, куда перенаправлять после входа
    afterSignUp: "/form-page", // Или другой нужный путь после регистрации
  },
});
