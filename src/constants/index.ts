export const DEV_SETTING = {
  mode: 'dev',
  port: '4000',
  clientURL: 'http://localhost:3000',

  db: {
    port: '3306',
    database: 'mayi-dev',
  },
  morganMode: 'dev',
} as const;

export const PROD_SETTING = {
  mode: 'prod',
  port: '80',
  clientURL: '', // TODO
  domain: '', // TODO

  db: {
    port: '3306',
    database: 'mayi',
  },
  morganMode: 'combined',
} as const;
