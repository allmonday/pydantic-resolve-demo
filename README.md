# pydantic-resolve-demo

## be

```shell
pip install -r requirement.pip
fastapi dev main.py
```

visit http://localhost:8000/docs#/main/read_my_site


## fe

ensure server is running, and then generate the client from `localhost:8000/openapi.json`
```shell
cd fe
npm install
npm run openapi-ts
npx ts-node main.ts
```

inspect the log output
