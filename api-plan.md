# API Plan

## User

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
        "umur": "<age>",
        "level_aktivitas": "<aktivitas>",
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
  // profile
  "umur": Number,
  "jenis_kelamin": String,
  "level_aktivitas": String,
  "tingi_badan": Number,
  "berat_badan": Number,
  // nutrition profile
  "kalori": Number,
  "protein": Number,
  "karbohidrat": Number,
  "lemak": Number
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

Path: `/users`
Method: `PUT`
Headers: `Bearer Token`

Body:

```json
{
  "nama": String,
  "email": String,
  "password": String,
  // profile
  "umur": Number,
  "level_aktivitas": String,
  "tingi_badan": Number,
  "berat_badan": Number,
  // nutrition profile
  "kalori": Number,
  "protein": Number,
  "karbohidrat": Number,
  "lemak": Number
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

Path: `/makanan`
Method: `GET`

Query:


| Query params | Type   | Default |
| -------------- | -------- | --------- |
| page         | number | 1       |
| limit        | number | 10      |
| s            | string |         |

Response:

```json
{
  "status": "success",
  "data": {
    "makanan": [
      {
        "nama": "<food_name>",
        "kalori": "<kalori>",
        "protein": "<protein>",
        "karbohidrat": "<karbohidrat>",
        "lemak": "<lemak>",
        "image": "<food_image>"
      },
      ...
    ],
    "metadata": {
      "total_data": "<count_data>",
      "total_page": "<count_all_page>",
      "data_per_page": "<limit_per_page>",
      "current_page": "<page_active>"
    }
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
  "makanan_id": Number,
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
