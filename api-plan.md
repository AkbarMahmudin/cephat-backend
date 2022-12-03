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

Path: `/users`
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
        "nama": "<makanan_name>",
        "kalori": "<kalori>",
        "protein": "<protein>",
        "karbohidrat": "<karbohidrat>",
        "lemak": "<lemak>",
        "image": "<makanan_image>"
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
        "qty": "<num_qty>",
        "is_done": "<bool_isDone>",
        "makanan": {
          "id": "<makananId>",
          "nama": "<makanan_name>",
          "image": "<makanan_image>",
          "total_kalori": "<kalori>",
          "total_protein": "<protein>",
          "total_karbohidrat": "<karbohidrat>",
          "total_lemak": "<lemak>"
        },
      },
      ...
    ],
    "metadata": {
      "count_makanan": "<count_num_makanan>",
      "count_kalori": "<count_num_kalori>",
      "count_protein": "<count_num_protein>",
      "count_karbohidrat": "<count_num_karbohidrat>",
      "count_lemak": "<count_num_lemak>"
    }
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
  "id_done": Boolean,
  "qty": Number
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
        "makanan": {
          "nama": "<makanan_name>",
          "kalori": "<kalori>",
          "protein": "<protein>",
          "karbohidrat": "<karbohidrat>",
          "lemak": "<lemak>",
          "image": "<makanan_image>"
        },
        "tgl": "<date_consume>"
      },
      ...
    ]
  }
}
```
