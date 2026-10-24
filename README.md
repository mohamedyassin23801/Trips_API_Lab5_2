# Trips API — Lab 5.2

This is a standalone reference implementation of the Lab 5.2 requirements. If you already have a Trips API from the earlier lab, merge the middleware, compare endpoint, and route changes into that project rather than submitting this as a replacement.

## Run
1. Open a terminal in this folder.
2. Run `npm install`.
3. Run `npm start`.
4. The server uses port 3000 by default.

## Endpoints
- `GET http://localhost:3000/trips` — public list
- `GET http://localhost:3000/trips/1` — public detail
- `POST http://localhost:3000/trips` — requires header `x-role: admin` and valid JSON
- `PUT http://localhost:3000/trips/1` — requires header `x-role: admin` and valid JSON
- `DELETE http://localhost:3000/trips/1` — requires header `x-role: admin`
- `POST http://localhost:3000/api/v1/trips/compare` — public comparison

### Create/update JSON
```json
{
  "destination": "Alexandria",
  "country": "Egypt",
  "cost": 250
}
```

### Compare JSON
```json
{
  "tripId1": 1,
  "tripId2": 2
}
```

## Postman notes
For POST/PUT, select Body → raw → JSON. For protected routes, add `x-role` in the Headers tab with value `admin`. Try `user` and no header too; they should return 403 and leave the data unchanged. Request logging appears in the terminal. The `x-role` header is only a classroom simulation, not real authentication. Data is in memory and resets when the server restarts.
