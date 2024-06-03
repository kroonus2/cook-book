# Projeto Livro de Receitas - "Cookbook"

## Visão Geral

Este projeto é um sistema de gerenciamento de receitas, composto por um frontend desenvolvido com Angular 17.3 e Tailwind CSS, e um backend desenvolvido com Ruby on Rails 7.1. O objetivo é permitir que os usuários possam adicionar, editar, visualizar e excluir receitas.

## Tecnologias Utilizadas

### Frontend

- **Angular CLI 17.3**: Um framework de aplicação web para criar aplicativos de uma única página.
- **Tailwind CSS**: Um framework CSS para design eficiente e moderno.

### Backend

- **Ruby on Rails 7.1**: Um framework de desenvolvimento web que fornece estrutura para o banco de dados, um serviço web, e páginas web e utilizado nesse projeto em formato de API RESTful.

- **SQLite3**: Para armazenamento de dados.

## Estrutura do Projeto

- **/client/**: Contém o código-fonte do frontend Angular.
- **cook-book/**: Contém o código-fonte do backend Ruby on Rails.

## Requisitos

- **Node.js** (versão 14 ou superior)
- **npm** (versão 6 ou superior)
- **Ruby** (versão 2.7 ou superior)
- **Rails** (versão 7.1 ou superior)
- **SQLite3** (ou outro banco de dados compatível com Rails)

## Instalação

### Backend (API)

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/kroonus2/cook-book.git
   cd cook-book
   ```

2. **Instale as dependências:**

   ```sh
   bundle install
   ```

3. **Configure o banco de dados:**

   ```sh
   rails db:create
   rails db:migrate
   ```

4. **Execute o servidor:**

   ```sh
   rails server
   ```

   O servidor estará disponível em `http://localhost:3000`.

### Frontend (Client)

1. **Navegue até o diretório do cliente:**

   ```sh
   cd client
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Execute o servidor de desenvolvimento:**

   ```sh
   ng serve
   ```

   O frontend estará disponível em `http://localhost:4200`.

## Uso

- **Crie Uma Conta:** Crie uma conta de usuário para poder usufruir de todas as funcionalidades do livro de receitas.
- **Gerenciar Perfil:** Navegue pelo perfil de usuário, gerenciando receitas favoritas, criadas, arquivadas.
- **Adicionar Receita:** Navegue até a página de adicionar receita e preencha o formulário.
- **Editar Receita:** Navegue até a receita que deseja editar e clique no botão de edição.
- **Visualizar Receita:** Clique em qualquer receita na lista para ver os detalhes.
- **Excluir Receita:** Clique no botão de excluir ao lado da receita que deseja remover.

## Contribuição

1. **Fork o repositório**
2. **Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)**
3. **Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)**
4. **Push para a branch (`git push origin feature/nova-feature`)**
5. **Abra um Pull Request**

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.
