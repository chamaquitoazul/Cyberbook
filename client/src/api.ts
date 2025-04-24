import axios from "axios";

export const CYBERBOOK_SERVER_BASE_URL = "http://localhost:5251";
export const CYBERBOOK_API_URL = CYBERBOOK_SERVER_BASE_URL + "/api";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: CYBERBOOK_API_URL,
  validateStatus: () => true,
});

interface SignupDTO {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatarImage: File | undefined;
}

export interface User {
  idUser: string;
  fullName: string;
  userName: string;
  email: string;
  avatarImageUrl: string;
  signupDate: string;
}

export interface Book {
  idBook: string;
  title: string;
  synopsis: string;
  authorName: string;
  publicationYear: number;
  linkPDF: string;
  categoryName: string;
  genres: string[];
  linkCover: string;
}

export const login = async (
  emailOrUsername: string,
  password: string,
  onSuccess: (user: User) => void,
  onFail: (error: string) => void
) => {
  try {
    let response = await api.post("/auth/login", {
      emailOrUsername,
      password,
    });
    if (response.data.status === "success") {
      let user: User = response.data.data;
      onSuccess(user);
    } else {
      let error = response.data.message;
      onFail(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (
  dto: SignupDTO,
  onSuccess: (user: User) => void,
  onFail: (error: string) => void
) => {
  var form = new FormData();
  form.append("fullName", dto.fullName);
  form.append("username", dto.username);
  form.append("email", dto.email);
  form.append("password", dto.password);
  form.append("confirmPassword", dto.confirmPassword);
  if (dto.avatarImage) {
    form.append("avatarImage", dto.avatarImage);
  }
  try {
    let response = await api.post("/auth/signup", form);
    if (response.data.status === "success") {
      let user: User = response.data.data;
      onSuccess(user);
    } else {
      let errors = response.data.errors;
      onFail(errors[Object.keys(errors)[0]][0]);
    }
  } catch (error) {
    onFail("Error de conexión, inténtelo de nuevo o contacte al soporte");
  }
};

export const getAllBooks = async () => {
  try {
    let response = await api.get("/books");
    if (response.data.status === "success") {
      let books: Book[] = response.data.data;
      return books;
    }
  } catch (error) {
    console.error("Error fetching books", error);
  }
  return [];
};

export const verifyAuth = async () => {
  try {
    let response = await api.get("/auth/verify", {
      withCredentials: true,
    });
    if (response.data.status === "success") {
      let user: User = response.data.data;
      return user;
    }
  } catch (error) {
    console.error("Error verifying token", error);
  }
  return null;
};

export const logout = async (
  onSuccess: () => void,
  onFail: (error: string) => void
) => {
  try {
    let response = await api.get("/auth/logout", {
      withCredentials: true,
    });
    if (response.data.status === "success") {
      onSuccess();
    } else {
      onFail(response.data.message);
    }
  } catch (error) {
    console.error("Error logging out", error);
  }
  return null;
};
