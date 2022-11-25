# API Plan

## User

### Get ALL User

Path: `/users`
Method: `GET`

Response:

```json
{
  "status": "success",
  "data": {
    "users": [
      {
        "id": "<userId>",
        "name": "<name>",
        "email": "<email>"
      },
      ...
    ]
  }
}
```

### Login

Path: `/users/auth`
Method: `POST`

Body:

```json
{
  "email": String,
  "password": String
}
```

Response:

```json
{
  "status": "success",
  "data": {
    "access_token": "<random_token_from_jwt>"
  }
}
```

### Get User By ID

Path: `/users`
Method: `GET`
Headers: `Bearer Token`

Response:

```json
{
  "status": "success",
  "data": {
    "users": {
      "id": "<userId>",
      "nama": "<name>",
      "email": "<email>",
      "profile": {
        "tgl_lahir": "<date_birthday>",
        "jenis_kelamin": "<L || P>",
        "tinggi_badan": "<tinggi_badan>",
        "berat_badan": "<berat_badan>"
      },
      "nutrition_profile": {
        "kalori": "<kalori>",
        "protein": "<protein>",
        "karbohidrat": "<karbohidrat>",
        "lemak": "<lemak>",
      }
    }
  }
}
```

### Create User as Register

Path: `/users`
Method: `POST`

Body:

```json
{
  "nama": String,
  "email": String,
  "password": String,
  "tgl_lahir": Date(YYYY-MM-DD),
  "tingi_badan": Number,
  "berat_badan": Number
}
```

Response:

```json
{
  "status": "success",
  "message": "User created successfully"
}
```

### Update User

Path: `/users/:id`
Method: `PUT`
Headers: `Bearer Token`

Body:

```json
{
  "nama": String,
  "email": String,
  "password": String,
  "tgl_lahir": Date,
  "tingi_badan": Number,
  "berat_badan": Number
}
```

Response:

```json
{
  "status": "success",
  "message": "User updated successfully"
}
```

## Makanan

### Get All Makanan

Path: `/foods`
Method: `GET`

Response:

```json
{
  "status": "success",
  "data": {
    "foods": [
      {
        "nama": "<food_name>",
        "kalori": "<kalori>",
        "protein": "<protein>",
        "karbohidrat": "<karbohidrat>",
        "lemak": "<lemak>",
        "image": "<food_image>"
      },
      ...
    ]
  }
}
```

## Plan

### Get All Plan User

Path: `/plans`
Method: `GET`
Headers: `Bearer Token`

Response:

```json
{
  "status": "success",
  "data": {
    "plans": [
      {
        "id": "<planId>",
        "food": {
          "id": "<foodId>",
          "nama": "<food_name>",
          "kalori": "<kalori>",
          "protein": "<protein>",
          "karbohidrat": "<karbohidrat>",
          "lemak": "<lemak>",
          "image": "<food_image>",
        },
        "status": "<status>"
      },
      ...
    ],
    "count_foods": "<count_num_foods>",
    "count_calories": "<count_num_calories>",
    "count_proteins": "<count_num_proteins>",
    "count_carbohydrates": "<count_num_carbohydrates>",
    "count_fat": "<count_num_fat>"
  }
}
```

### Create Plan User

Path: `/plans`
Method: `POST`
Headers: `Bearer Token`

Body:

```json
{
  "food_id": Number,
  "user_id": Number
}
```

Response:

```json
{
  "status": "success",
  "message": "plan created successfully"
}
```

### Update Plan User

Path: `/plans/:id`
Method: `PUT`
Headers: `Bearer Token`

Body:

```json
{
  "status": Number
}
```

Response:

```json
{
  "status": "success",
  "message": "plan created successfully"
}
```

### Delete Plan User

Path: `/plans/:id`
Method: `DELETE`
Headers: `Bearer Token`

Response:

```json
{
  "status": "success",
  "message": "plan deleted successfully"
}
```

### Get All History User

Path: `/histories`
Method: `GET`
Headers: `Bearer Token`

Query:

```
start_date=
end_date=
```

Response:

```json
{
  "status": "success",
  "data": {
    "histories": [
      {
        "id": "<historyId>",
        "food": {
          "nama": "<food_name>",
          "kalori": "<kalori>",
          "protein": "<protein>",
          "karbohidrat": "<karbohidrat>",
          "lemak": "<lemak>",
          "image": "<food_image>"
        },
        "tgl": "<date_consume>"
      },
      ...
    ]
  }
}
```
