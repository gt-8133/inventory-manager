Quickstart:
```sh
npm install # install dependencies
npm start # start server locally
```

### Start up the server:
```sh
npm start
```

### Backup the database (snapshot all data to a file):
```sh
npm run db:backup -- backups/fileName.sql
```

Restore the database:
```sh
npm run db:restore -- backups/fileName.sql
```

Run mysql terminal client:
```sh
npm run mysql
```

