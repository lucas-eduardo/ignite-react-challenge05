<h1 align="center">
    <img alt="Ignite" src=".github/ignite.jpeg" width="200px" />
</h1>

<h3 align="center">
  Desafio 5 - Criando um projeto do zero
</h3>

<p align="center">“Se tu o desejas, podes voar, só tens de confiar muito em ti.”</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucas-eduardo/ignite-react-challenge05?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

## :rocket: Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no ReactJS

Essa será uma aplicação onde o seu principal objetivo é criar um blog do zero. Você vai receber uma aplicação praticamente em branco que deve consumir os dados do Prismic e ter a interface implementada conforme o layout do Figma. Você terá acesso a diversos arquivos para implementar:

- Estilizações global, comun e individuais;
- Importação de fontes Google;
- Paginação de posts;
- Cálculo de tempo estimado de leitura do post;
- Geração de páginas estáticas com os métodos `getStaticProps` e `getStaticPaths`;
- Formatação de datas com `date-fns`;
- Uso de ícones com `react-icons`;
- Requisições HTTP com `fetch`;
- Entre outros.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

## Rodar o Projeto

`yarn install`

`yarn dev`

## Se preparando para o desafio

Para esse desafio, iremos reforçar alguns pontos e apresentar algumas libs para te ajudar no desolvimento.

Começando pelo tema do projeto: criando um projeto do zero. Como isso é inviável por causa dos testes e algumas verificações que precisamos que vocês sigam, criamos um projeto com a menor quantidade de código possível. A idéia é se assemelhar a um projeto recém criado com a CLI do Next.js.

Dessa forma, antes de ir diretamente para o código do desafio, explicaremos um pouquinho de:

- Prismic;
- Figma;
- fetch;
- react-icons;
- date-fns.

Vamos nessa?

## Prismic

Como você já deve ter visto nas aulas, o Prismic é uma Headless CMS. Vamos utilizá-lo para gerar documentos repetíveis (post) que vão retornar alguns dados para a aplicação. Nesse ponto, é muito importante que você siga **exatamente** a estrutura que vai ser apresentada aqui pois os testes **dependem** disso.

### Campos

- **slug**
    - Tipo: UID
    - Descrição: Identificador único amigável de cada post. Pode receber um valor manualmente ou é gerado automaticamente a partir do primeiro campo de texto preenchido. Esse campo vai ser utilizado na navegação do Next.
- **title**
    - Tipo: Key Text
    - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como título do Post.
- **subtitle**
    - Tipo: Key Text
    - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como subtítulo do Post.
- **author**
    - Tipo: Key Text
    - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como nome do autor do Post.
- **banner**
    - Tipo: Image
    - Configurações do campo:
    - Descrição: Input de imagens. Recebe valores manualmente. Esse campo será utilizado como banner do Post.
- **content**
    - Tipo: Group
- Descrição: Grupo de campos repetíveis. Esse campo será utilizado como o conteúdo do Post. O conteúdo será dividido em seções com um campo `heading` e um campo `body`.
- Campos internos:
    - **heading**
        - Tipo: Key Text
        - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como título da seção do Post.
    - **body**
        - Tipo: Rich Text
        - Configurações do campo:
        - Descrição: Input de *rich text* (HTML). Recebe valores manualmente. Esse campo será utilizado como conteúdo da seção do Post. Perceba que nas configurações do campo, selecionamos algumas opções para que o seu texto tenha varias formatações (negrito, hyperlinks, listas, etc.).

Por fim, vamos falar rapidamente dos métodos que esperamos que você utilize em cada arquivo:

- **src/pages/index.tsx**: Utilizar o método `query` para retornar todos os `posts` já com paginação. Por padrão, a paginação vem configurada como 20. Portanto se quiser testar sem ter que criar mais de 20 posts, altere a opção `pageSize` para o valor que deseja.
- **src/pages/posts/[slug.tsx]**: Utilizar o método `query` para buscar todos os `posts` e o `getByUID` para buscar as informações do `post` específico.

Além disso, não esqueça de configurar no arquivo `.env.local` na raiz do seu projeto a variável `PRISMIC_API_ENDPOINT` com a url da sua API

## Figma

Um ponto muito importante desse desafio que queremos que vocês exercitem é a implementação de uma interface a partir de um layout do Figma, como se você tivesse recebido isso das mãos de um designer.

Nesse desafio, você deve implementar o layout da página `Obrigatório`.

## Acessando o layout do app
Agora para duplicar os layouts, basta você clicar no link abaixo. Ele adicionará o Layout à sua dashboard do Figma automaticamente, como uma cópia.

[Desafios Módulo 3 ReactJS](https://www.figma.com/file/0Y26j0tf1K2WB5c1ja5hov/Desafios-M%C3%B3dulo-3-ReactJS?node-id=0%3A1/duplicate)

## O que devo editar na aplicação?

Com o template já clonado, as depêndencias instaladas e o Prismic já configurado, você deve completar onde não possui código com o código para atingir os objetivos de cada teste. Os documentos que devem ser editados são:

- [src/pages/_document.tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/_document.tsx);
- [src/pages/index.tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/index.tsx);
- [src/pages/home.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/home.module.scss);
- [src/pages/post/[slug].tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/post/%5Bslug%5D.tsx);
- [src/pages/posts/post.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/post/post.module.scss);
- [src/components/Header/index.tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/components/Header/index.tsx);
- [src/components/Header/header.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/components/Header/header.module.scss);
- [src/styles/global.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/styles/globals.scss);
- [src/styles/common.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/styles/common.module.scss).

### pages/_document.tsx

Nesse arquivo você deve configurar a importação da fonte `Inter` do Google Fonts. Os tamanhos utilizados são `Regular`, `Semi Bold` e `Bold`.

### pages/index.tsx

Nesse arquivo você deve renderizar todos os posts da paginação e exibir o botão `Carregar mais posts` caso existam mais posts a ser carregados (ou seja, o valor `next_page` retornado pela Prismic não pode ser `null`). Caso contrário, o botão não deve ser renderizado.

A logo `spacetraveling` deve ser exportada do Figma e salva na pasta `public` na raiz do seu projeto para a correta utilização. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

Ao clicar no post, é preciso navegar para a pagina do post seguindo o formato `/post/slugDoPost` onde `slugDoPost` é referente ao valor `slug` retornado pelo Prismic.

Por fim, a sua página deve ser gerada estaticamente. Isso significa que você deve utilizar o `getStaticProps` para buscar os dados do Prismic e popular a sua prop `postsPagination` exatamente como deixamos na estrutura de interfaces. Nesse método é obrigatório utilizar o [query](https://prismic.io/docs/technologies/query-a-single-type-document-javascript) do Prismic.

### pages/home.module.scss

Nesse arquivo você deve implementar toda a estilização da página principal.

### pages/post/[slug].tsx

Nesse arquivo você deve renderizar toda a informação do post e o component `Header`.

O tempo estimado de leitura deve ser calculado manualmente por você. Mas não se assuste, a ideia é simples. Basicamente você deve calcular todas as palavras dentro do texto do seu post, dividir pela média de palavras que um ser humano lê por minuto e arredondar para cima. Para esse desafio, utilize que o ser humano leia, em média, 200 palavras por minuto. Então se o seu texto possuir 805 palavras, você irá dividir por 200 e arredondar o resultado para cima, chegando assim no valor de 5 minutos estimados para leitura do post.

Agora no aspecto do código, você deve iterar no array da propriedade `content` para buscar a quantidade de palavras de cada seção (`heading` e `body`).

Para calcular o tempo estimado de leitura, sugerimos utilizar o método `reduce` para iterar o array `content`, o método `PrismicDOM.RichText.asText` para obter todo o texto do `body` e utilizar o método `split` com uma `regex` para gerar um array de palavras.

A logo `spacetraveling` deve ser exportada do Figma e salva na pasta `public` na raiz do seu projeto para a correta utilização. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

A sua página deve ser gerada estaticamente. Isso significa que você deve utilizar o `getStaticProps` para buscar os dados do Prismic e popular a sua prop `post` exatamente como deixamos na estrutura de interfaces. Nesse método é obrigatório utilizar o [getByUID](https://prismic.io/docs/technologies/query-helper-functions-javascript#getbyuid) do Prismic.

Além disso, você deve utilizar o `getStaticPaths` para gerar as páginas estáticas de alguns posts e setar o `fallback` como `true` para que o restante seja gerado no momento da requisição. Nesse método é obrigatório utilizar o [query](https://prismic.io/docs/technologies/query-a-single-type-document-javascript) do Prismic.

Por fim, nos casos que cairem no `fallback`, é **obrigatório** que você renderize pelo menos um texto na tela dizendo `Carregando...` para que o teste consiga verificar esses casos corretamente.

### posts/post.module.scss

Nesse arquivo você deve implementar toda a estilização da página de post.

### components/Header/index.tsx

Nesse arquivo você deve renderizar a logo `spacetraveling`.

Ela deve ser exportada do Figma e salva na pasta `public` na raiz do seu projeto para a correta utilização. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

Por fim, ao clicar na logo é preciso navegar para a página principal `/`.

### components/Header/header.module.scss

Nesse arquivo você deve implementar toda a estilização do Header da aplicação.

### styles/global.scss

Nesse arquivo você deve implementar toda a estilização global da sua aplicação (ex.: variáveis das cores do seu projeto).

### styles/common.module.scss

Nesse arquivo você deve implementar toda a estilização comum entre os arquivos das suas páginas (ex.: largura máxima).

## 📅 Entrega

Esse desafio deve ser entregue a partir da plataforma da Rocketseat. Envie o link do repositório que você fez suas alterações. Após concluir o desafio, além de ter mandado o código para o GitHub, fazer um post no LinkedIn é uma boa forma de demonstrar seus conhecimentos e esforços para evoluir na sua carreira para oportunidades futuras.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
