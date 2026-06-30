# Mini Policy Management Frontend

React + Vite frontend for the Mini Policy Management System.

## Folder Structure

text
frontend
├── public
├── src
│   ├── api
│   ├── components
│   ├── pages
│   └── styles
├── index.html
├── package.json
└── vite.config.js
```

## Pages

- `CustomerList`
- `CustomerForm`
- `PolicyList`
- `PolicyForm`
- `AssignPolicy`

## Run

```bash
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` and proxies `/api` requests to the Spring Boot backend on `http://localhost:8080`.
