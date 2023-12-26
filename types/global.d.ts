declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TURNSTILE_SITE_KEY: string;
    }
  }
}
