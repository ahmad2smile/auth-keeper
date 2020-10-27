# Auth Keeper

A Auth Gateway as Reverse Proxy.

## Run

1. Build Project

```
npm run build
```

2. Run `auth-keeper` in some example dir

```
cd exmaples/apps

node ../../dist/src/index.js
```

3. Run target Servers

```
cd exmaples/apps

node servers.js
```

4. Nav

to App1

```
https://localhost:3005/app1
```

to App2

```
https://localhost:3005/app2
```
