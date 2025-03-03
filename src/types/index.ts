export enum Role {
  User = "user",
  Admin = "admin",
}

export enum Status {
  Open = "open",
  InProgress = "in progress",
  Closed = "closed",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  message: string | null;
  error: string | null;
}

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  user: Omit<User, "role">;
}

export interface TicketsState {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

export interface RootState {
  auth: AuthState;
  tickets: TicketsState;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RejectedPayload {
  status: number;
  message: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ReturnLoginPayload {
  token: string;
  user: User;
  message: string;
}

export interface ReturnRegisterPayload {
  message: string;
}

export interface TicketPayload {
  title: string;
  description: string;
}

export interface TicketUpdatePayload {
  id: string;
  status: string;
}

export interface ReturnTicketPayload {
  data: Ticket;
  message: string;
}
