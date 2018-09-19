import { gql } from 'apollo-boost';

export const GET_TODOS = gql`
  query {
    allTodos {
      id
      title
      completed
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_TODO = gql`
  mutation createTodo($title: String!) {
    createTodos(title: $title) {
      title
      id
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodos(id: $id) {
      title
      id
      completed
    }
  }
`;

export const DONE_TODO = gql`
  mutation doneTodo($id: ID!) {
    doneTodos(id: $id) {
      title
      id
      completed
    }
  }
`;
