# Clairvoyant 🔮

## Introduction

Clairvoyant is a simple tool to help you predict the future. It uses a simple GPT3.5 model to generate text based on a prompt. The model is trained on a large corpus of text and can generate text that is coherent and relevant to the prompt.


## Get Started

To get started, you need to install the dependencies. You can do this by running the following command:

```bash
cp .env.example .env
npm install
```

Next you have to edit the .env file.

```dotenv
PORT=3000
DB_URL=mysql://root:root@localhost:3306/expressjs
APP_SECRET=secret
REFRESH_TOKEN_SECRET=refresh
JWT_EXPIRES_IN=3600
REFRESH_EXPIRES_IN=604800
```

Run the database schema update:

```bash
npm run db:schema:update
```

FInaly, you can start the server by running:

```bash
npm run dev
```


