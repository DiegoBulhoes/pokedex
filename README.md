# Pokedex

Esse repositório tem como objetivo demonstrar a utilização de uma API REST com Vue Js para os alunos da [Faculdade de Computação - UFMS ]('https://www.facom.ufms.br/'). API escolhida foi [Pokeapi](https://pokeapi.co/).

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

## Iniciar o ambiente

Para iniciar o ambiente será necessário instalar as dependências do projeto, para isso execute o seguinte comando:

```shell

npm install

```

Após a instalação será possível executar a aplicação usando o [Docker](https://docker.com/) ou [NPM](https://www.npmjs.com/)

- NPM

```shell
npm run serve
```

A saída espera será similar a essa:

```text

DONE Compiled successfully in 25799ms 07:00:01


App running at:

- Local: http://localhost:8080/

- Network: http://192.168.15.15:8080/


Note that the development build is not optimized.

To create a production build, run npm run build.
```

- Docker

```shell
docker-compose up -d
```

Abra o navegador e digite uma da URLs geradas pelo comando anterior

![image](https://github.com/DiegoBulhoes/pokedex/blob/master/image.png)
