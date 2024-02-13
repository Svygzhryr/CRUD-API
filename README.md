# Simple CRUD api

### Application setup

1. Clone this repo
2. Go to folder **CRUD-API**
3. To install all dependencies use `npm install` or `npm i`
4. You can start the app:

    - in development mode using `npm run start:dev`
    - in production mode using `npm run start:prod`
____
#### NOTE!
Initial users in database have static uuid, for the new users added via POST request uuid will be generated on server side.
____
### Usage:

`GET` with url `api/users` to get all users. You will get answer with two users like:

```
[
    {
        "id": "4389c860-c9b9-11ee-bb35-999792e3ab4a",
        "username": "Jin",
        "age": 19,
        "hobbies": ['fighting']
    },
    {
        "id": "8489c860-a9b9-11ee-bb35-992492e3ab4a",
        "username": "Kazuya",
        "age": 40,
        "hobbies": ['conquer', 'destroy']
    }
]
```

`GET` with url `api/users/:id` to get one user data like:

```
    {
        "id": "8489c860-a9b9-11ee-bb35-992492e3ab4a",
        "username": "Kazuya",
        "age": 40,
        "hobbies": ['conquer', 'destroy']
    }
```

`POST` with url `api/users` to add user. You need to send body like:
```
    {
        "username": "Jin",
        "age": 19,
        "hobbies": ['fighting']
    }
```

`PUT` with url `api/users/:id` to update user. You need to send body with fields which you want to update. Example:
```
    {
        "username": "Jack",
    }
```

`DELETE` with url `api/users/:id` to remove user.
