# SLS Easy Routing
A lib to easily make routes in lambdas using the Serverless Framework

## 🤔 Why would I use it?
Sometimes there is no need of having multiple lambdas, for example, let's suppose we have one lambda to get the user email and other lambda to get the user phone number. In this case, we could have only one lambda with two endpoints, `/email` and `/phone`. Doing this way, you will have a much more organized AWS and it will be possible to separate lambdas by domain.
To make this, you would need to create something to handle the requests incoming, by checking the path and method and then, if matching, run a certain function.
With this lib, you can easily do this :)

## 💻 Requirements
- Use the [serverless](https://www.serverless.com/) framework
- Typescript project

You can find how to this [here](https://blog.logrocket.com/building-serverless-app-typescript/)

## 💽 Installation
```console
hello@world:~$ yarn add slseasyrouting
```
or
```console
hello@world:~$ npm i slseasyrouting
```

## 🚀 Usage
First, you'll need to create a routes file, I recommend something like `routes.ts`, inside it, create a class called Routes and add the `@Route` decorator, inside the class, add a constructor containing the event and then the methods with the desired decorator, check the example:

```ts
import { getDate, hello } from "./services/hello.service";
import { Route, Post, Get } from "slseasyrouting";

@Route
export class Routes {
  constructor(private readonly event: any) {}

  @Post("/")
  async helloRoute(event) {
    return await hello(event.body.name);
  }

  @Get("/")
  async getTodaysDate() {
    return await getDate();
  }
}
```
Inside the decorator, you can pass the desired endpoint, for example, `@Get('/users/email')`.

This lib contains some responses too in case you want to use, for example, if you want to throw a 401, you can use `return UnAuthorized()`. You can pass a custom message too by providing it inside the function parameters, for example: `return UnAuthorized('Get out!')`.

## 🗿 Responses
As said before, this lib contains some functions that you can call for responses. At the moment we have:

| function           | status code |
|--------------------|-------------|
| UnAuthorized       |     401     |
| NotFound           |     404     |
| Gone               |     410     |
| BadRequest         |     400     |
| ServiceUnavailable |     503     |
