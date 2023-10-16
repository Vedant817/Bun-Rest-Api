import { Elysia } from "elysia";

// Defining a Plugin: Plugin helps in breaking the code into multiple components.
const plugin = new Elysia()
  .state('plugin-version', 1)
  .get('/form-plugin', () => 'Hi') // just returning a string
  .get('/greet', () => 'Hello Dev')

const app = new Elysia().get("/", () => "Hello Elysia")
  .use(plugin) // Registering the Plugin
  .state('version', 1)
  .decorate('getDate', () => Date.now())
  .get('/post/:id', ({ params: { id } }) => { return { id: id, title: 'Learn Bun' } }) // Here we can also add validations which will help in adding the valid param format instead of any other type of params.
  .post('post', ({ body, set }) => {
    set.status = 201
    return body
  }) // This is done so that we can get json in  the response.
  .get('/track/*', () => { return 'Track Route' })
  .get('/tracks', ({ store, getDate }) => {
    console.log(store);
    console.log(getDate())
    console.log(store['plugin-version'])
    return new Response(JSON.stringify({
      "tracks": [
        "Dancing Feat",
        "Never be the Same",
        "Animals"
      ]
    }
    ))
  })

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
// Grouping multiple routes:
app.group('/user', app => app
  .post('/signin', () => 'Signin Route')
  .post('/signup', () => 'Signup Route')
  .post('/profile', () => 'Profile Route')
)

app.listen(3000);