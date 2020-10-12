# Pokedex

Esse repositório tem como objetivo demonstrar a utilização de uma API REST com Vue Js para os alunos da [Faculdade de Computação - UFMS ]('https://www.facom.ufms.br/'). API escolhida foi [Pokeapi](https://pokeapi.co/).

![image](https://github.com/DiegoBulhoes/pokedex/blob/master/image.png)

## Iniciar o ambiente

O projeto está configurado para ser inicializado de três formas: [Docker](https://docker.com/), [NPM](https://www.npmjs.com/) ou [Google Cloud Run](https://cloud.google.com/run).

- Google Cloud Run

Para inicializar o projeto basta ter uma conta habilitada para utilização da Google Cloud e clicar no seguinte botão após o _build_ será exposto a URL da aplicação.

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

- NPM

```shell
npm install
```

Após a instalação será possível executar a aplicação usando o [NPM](https://www.npmjs.com/)

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

Abra o navegador e digite uma da URLs geradas pelo comando anterior

- Docker

```shell
docker-compose up -d
```

Abra o navegador e digite a seguir URL

```text
http://localhost:8080/
```
