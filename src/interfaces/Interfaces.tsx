enum Roles {
  ADMIN,
  MEMBER,
}

export interface ICompany {
  id: string;
  companyName: string;
  ownerEmail: string;
}

export interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: Roles;
  company: ICompany;
}
export interface IFilters {
  email: string;
  search: string;
  limit: number;
  skip: number;
  id: string;
}

export interface IFiltersTasks {
  id: string;
  filterBy: string;
  search: string;
  limit: number;
  skip: number;
}

export interface ITasks {
  id: string;
  name: string;
  users: [User];
  isDone: boolean;
  owner: {
    company: ICompany;
    role: string;
    email: string;
    name: string;
    avatar: string;
    id: string;
  };
  completionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
