#engagement

  npm run nibble
  npm test

  Dropdb engagement_desk-dev
  Createdb engagement_desk-dev
  Knex migrate:latest
  Knex seed:run
  Psql engagement_desk-dev

  ALTER SEQUENCE users_id_seq RESTART WITH 1000;
  ALTER SEQUENCE projects_id_seq RESTART WITH 1000;
  ALTER SEQUENCE employees_id_seq RESTART WITH 1000;


bugs -
collaspe side menu doesnt click on different component
projects page sidescroll bar if there are many projects
favicon-logo-name
