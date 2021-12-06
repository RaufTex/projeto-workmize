import { useQuery, gql } from '@apollo/client';

export const GET_MY_COMPANY = gql`
  {
    getMyCompany(email: "rtteixeira30@gmail.com") {
      id
      companyName
      ownerEmail
    }
  }
`;

export const ADD_NEW_USER = gql`
  mutation signUp(
    $name: String!
    $email: String!
    $password: String!
    $role: Roles!
    $companyId: String!
  ) {
    signUp(
      SignUpInput: {
        name: $name
        email: $email
        password: $password
        role: $role
        companyId: $companyId
      }
    )
  }
`;

export const LOGIN_USER = gql`
  mutation signIn($email: String!, $password: String!, $role: Roles!) {
    signIn(SignInInput: { email: $email, password: $password, role: $role }) {
      token
    }
  }
`;

export const GET_USER_INFO = gql`
  {
    whoAmI {
      id
      avatar
      name
      email
      role
      company {
        id
        companyName
        ownerEmail
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($userFilter: UserFilter!) {
    getUsers(UserFilter: $userFilter) {
      nodes {
        id
        avatar
        name
        email
        role
        company {
          id
          companyName
          ownerEmail
        }
      }
    }
  }
`;

export const ADD_NEW_TASK = gql`
  mutation createTask(
    $name: String!
    $responsible: [String!]!
    $completionDate: DateTime!
  ) {
    createTask(
      CreateTaskInput: {
        name: $name
        responsible: $responsible
        completionDate: $completionDate
      }
    )
  }
`;

export const GET_TASKS = gql`
  query GetTask($taskFilter: TaskFilter!) {
    getTasks(TaskFilter: $taskFilter) {
      nodes {
        id
        name
        users {
          email
          name
          avatar
          id
          role
          company {
            id
            companyName
            ownerEmail
          }
        }
        isDone
        owner {
          company {
            id
            companyName
            ownerEmail
          }
          role
          email
          name
          avatar
          id
        }
        completionDate
        createdAt
        updatedAt
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: String!) {
    createTask(DeleteTaskInput: { taskId: $taskId })
  }
`;

/* {
  name: $name
  email: $email
  password: $password
  role: $role
  companyId: $companyId
} */
/* 
export const ADD_NEW_USER = gql`
  mutation signUp(
    $name: String!
    $email: String!
    $password: String!
    $role: Roles!
    $companyId: String!
  ) {
    signUp(
      SignUpInput: {
        name: $name
        email: $email
        password: $password
        role: $role
        companyId: $companyId
      }
    ) {
      name
      email
      password
      role
      companyId
    }
  }
`; */
