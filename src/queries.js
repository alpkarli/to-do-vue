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
  mutation createTodo($title: String!, $completed: Boolean) {
    createTodo(title: $title, completed: $completed) {
      title
      id
      completed
    }
  }
`;
