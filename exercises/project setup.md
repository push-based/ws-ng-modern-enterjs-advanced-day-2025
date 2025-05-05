# Exercise: project setup

This exercise is here to make sure your setup is properly configured so that you don't run into any issues
when doing the actual coding exercises.

## 0. Make sure you have correct `node` * `npm` version

* `node ^18.19.1 || ^20.11.1 || ^22.0.0`
* `npm > 8`

e.g. 
```bash
node -v
v20.11.1

npm -v 
10.2.4

```

## 1. OPTIONAL: Install global cli

> [!NOTE]
> If you don't do this exercise, you can always use `npx` instead.
> `npx ng ...`.

First of all, check if you already have a version installed

```bash
ng version
```

Check if the version matches the current latest version `18.x.x`.

If so, you can skip the installation.

```bash
# if already installed with a lower version

npm i @angular/cli@latest -g
```

Output
```bash
+ @angular/cli@18.x.x
added 1 package from 1 contributor and updated 2 packages in ...
```

## 2. Open Project in IDE

> [!NOTE]
> If you use `vscode` you can run it directly from the terminal by executing `code ./path-to-project`.

```bash
code ./path-to-project
```

## 3. serve application

```bash
ng serve

# or

npx ng serve
```

application will be served at `localhost:4200` as default

> [!TIP]
> you can let the cli open your browser on the served host:port pattern with the `-o` argument

```bash
ng serve -o

# or

npx ng serve -o
```

## 4. Make sure the IDE, eslint & prettier are set up correctly

### 4.1 VSCode

```bash
CTRL + P

ext install esbenp.prettier-vscode

ext install dbaeumer.vscode-eslint

```
// .vscode/settings.json

```json

{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.format.enable": true,
}
```


