<p align="center">
  <img alt="PlantManager" title="PlantManager" src="./src/assets/plantManager.gif" width="250px">
</p>

<h1 align="center">🌱 PlantManager</h1>

<p align="center">Nunca mais esqueça de regar as suas plantinhas, nós avisaremos você quando chegar a hora! </p>

<p align="center">
 <a href="#-sobre">Sobre</a> • 
 <a href="#-executando-o-happy">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-como-contribuir">Como contribuir</a> • 
 <a href="#-licença">Licença</a> 
</p>

---

## 💡 Sobre

A aplicação permite o gerenciamento das regadas das plantinhas através do cadastramento de suas plantas favoritas e envios de notificações no horário escolhido pelo usuário.

Projeto construido durante a 5a NLW da [Rocketseat](https://rocketseat.com.br/).

---

## 💻 Executando o PlantManager

### Pré-requisitos

É necessário ter instalado na sua máquina para execução desse projeto:
- <a href="https://nodejs.org/en/"> NodeJS </a>;
- Gerenciador de pacotes Npm(já vem com o NodeJS) ou <a href="https://yarnpkg.com/getting-started/install"> Yarn </a>;
- <a href="https://pt-br.reactjs.org/"> React </a>;
- <a href="https://reactnative.dev/"> React Native </a>;
- <a href="https://docs.expo.io/get-started/installation/"> Expo </a>;


### ♊ Clonando o Repositório

```bash

$ git clone https://github.com/SilvioDiasJr/plantManager-React-Native

# entre na pasta do projeto

$ cd plantManager-React-Native

```
### 💻 Executando projeto 

Instale as dependências

```bash

$ yarn install

# ou, caso use npm

$ npm install

```

Rode a aplicação

```bash

$ expo start

```

### 🌐 Executando a api fake

Instale a dependência json-server

```bash

npm install -g json-server

```

Abra um novo terminal e execute o comando

```bash

json-server ./src/services/server.json --host "insira o ip de sua maquina" --port 3333 --delay 700

```
---

## 🛠️ Tecnologias

Principais tecnologias utilizadas no desenvolvimento do projeto.

- Typescript
- ReactJS ⚛️
- React Native
- Expo
- JSON Server

---

## ⚙️ Como contribuir

- Faça um fork desse repositório;
- Crie uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

---

## 📝 Licença

Este projeto está sob licença [MIT](./LICENSE).

<p>Feito com 💙 por <a href="https://www.linkedin.com/in/silviodiasjr/">Silvio Dias</a></p>
