import { createContext, useContext, useEffect, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
} from '@apollo/client';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import {
  ADD_NEW_TASK,
  GET_TASKS,
  GET_USERS,
  GET_USER_INFO,
  LOGIN_USER,
} from '../../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import apolloClient from '../../src/services/apollo-client';

enum Roles {
  ADMIN,
  MEMBER,
}

/* type User = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: Roles;
  company: {
    id: string;
    companyName: string;
    ownerEmail: string;
  };
}; */

import {
  IFilters,
  IFiltersTasks,
  ITasks,
  User,
} from '../interfaces/Interfaces';

type SignInData = {
  email: string;
  password: string;
  role: Roles;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  authToken: string;
  user: User;
  signOut: any;
  getUsers: any;
  filters: IFilters;
  listUsers: User[];
  createTask: any;
  tasks: ITasks[];
  getTasks: any;
};
/* 
type Users = {
  email: string;
  search: string;
  limit: number;
  skip: number;
  id: string;
  /* sign: SignInInput;
  email: string;
  createCompanyInput: string;
  userFilter: {
    email: string;
    search: string;
    limit: string;
    skip: string;
    id: string;
  }; */

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState<User>();
  const [filters, setFilters] = useState<IFilters>({
    email: null,
    search: null,
    limit: null,
    skip: null,
    id: null,
  });
  const [filtersTasks, setFilterTasks] = useState<IFiltersTasks>({
    id: null,
    filterBy: null,
    search: null,
    limit: null,
    skip: null,
  });
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const isAuthenticated = !!tasks;

  useEffect(() => {
    const { 'projeto.token': token } = parseCookies();

    if (token) {
      getUser();
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuthHeaders = () => {
    const { 'projeto.token': token } = parseCookies();

    return {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Credentials': true,
      withCredentials: true,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'https://hiring-api.workmize.com/graphql',
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getUser(/* { id, avatar, name, email, role, company } */) {
    const clientUser = createApolloClient();

    const resultUser = await clientUser.query({
      query: GET_USER_INFO,
      //variables: { id, avatar, name, email, role, company },
    });
    setUser(resultUser.data.whoAmI);
  }

  async function getUsers() {
    const clientUsers = createApolloClient();

    const result = await clientUsers.query({
      query: GET_USERS,
      variables: { userFilter: filters },
    });
    setListUsers(result.data.getUsers.nodes);
  }

  async function getTasks() {
    const clientTasks = createApolloClient();

    const result = await clientTasks.query({
      query: GET_TASKS,
      variables: { taskFilter: filtersTasks },
    });

    setTasks(result.data.getTasks.nodes);
  }

  async function signIn({ email, password, role }: SignInData) {
    const client = apolloClient;

    const result = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email, password, role },
    });

    if (result?.data?.signIn?.token) {
      var token = result.data.signIn.token;
      setAuthToken(result.data.signIn.token);
    }

    setCookie(undefined, 'projeto.token', result.data.signIn.token, {
      maxAge: 60 * 60 * 1,
    });

    await getTasks();
    await getUser();
    await getUsers();

    Router.push('/tarefas');
  }

  function signOut() {
    setAuthToken(null);
    destroyCookie({}, 'projeto.token');

    Router.push('/');
  }

  async function createTask({ name, responsible, completionDate }) {
    const clientTask = createApolloClient();
    const result = await clientTask.mutate({
      mutation: ADD_NEW_TASK,
      variables: { name, responsible, completionDate },
    });
  }

  return (
    <AuthContext.Provider
      value={{
        /* auth, */
        isAuthenticated,
        signIn,
        authToken,
        user,
        signOut,
        getUsers,
        filters,
        listUsers,
        createTask,
        tasks,
        getTasks,
      }}
    >
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
