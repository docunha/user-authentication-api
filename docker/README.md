# Docker com Postgresql e pgadmin4

Este é um arquivo docker-compose.yaml que sobe o servidor de postgresql e o pgadmin4 na máquina local. 

Para subir os containers execute o seguinte comando atraves terminal dentro da pasta que contém o arquivo docker-compose.yml

```docker-compose -f "docker-compose.yml" up -d --build```

Para destruir os container execute o seguinte comando atraves terminal dentro da pasta que contém o arquivo docker-compose.yml

```docker-compose -f "docker-compose.yml" down```


**As informações do BD serão persistidas na pasta ./bancos**

[Mais informações](https://imasters.com.br/banco-de-dados/postgresql-docker-executando-uma-instancia-e-o-pgadmin-4-partir-de-containers)