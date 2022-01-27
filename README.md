# Microserviço de autenticação com Nodejs

Este é um projeto desenvolvido durante algumas lives para dissiminação de conhecimento dentro da [DIO](https://dio.me/), uma plataforma de cursos gratuíta que todo DEV deveria conhecer! :wink:

Neste projeto iremos criar um **microserviço de autenticação** que poderá compor a sua caixinha de ferramentas e ser muito útil no seu dia a dia. :hammer::wrench:

## Composição do nosso projeto

Neste projeto Temos alguns **Endpoints Base** que podem ser extendidos da forma mais adequada para seu contexto. 

São eles:

### Usuários

* GET /users
* GET /users/:uuid
* POST /users
* PUT /users/:uuid
* DELETE /users/:uuid

### Autenticação

* POST /token
* POST /token/validate

### Para executa o projeto:


```npm install```

Subir os containers com o docker

```docker-compose -f "docker-compose.yml" up -d --build```

```npm run start```

---
### Links projeto original

O projeto original foi desenvolvido por 
## [Renan JP](https://github.com/RenanJPaula/)

[GitHub do projeto](https://github.com/RenanJPaula/dio-node-user-authentication-api)
