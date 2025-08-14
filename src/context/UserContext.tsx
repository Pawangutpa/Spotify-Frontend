import axios from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";
const server = "http://43.204.228.93:8000";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  playlist: string[];
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  btnloading: boolean;
  loginuser: (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  registeruser: (
    name:string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
    addToPlaylist:(id:string)=>void
    logoutUser:()=>Promise<void>

}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);


   async function registeruser(
    name:string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) {
    try {
      setBtnLoading(true);
      const { data } = await axios.post(`${server}/api/v1/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      setIsAuth(true);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "error occured");
    } finally {
      setBtnLoading(false);
      setLoading(false);
    }
  }
  async function loginuser(
    email: string,
    password: string,
    navigate: (path: string) => void
  ) {
    try {
      setBtnLoading(true);
      const { data } = await axios.post(`${server}/api/v1/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      setIsAuth(true);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "error occured");
    } finally {
      setBtnLoading(false);
      setLoading(false);
    }
  }
  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setLoading(false);
      setIsAuth(true);
      setUser(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  
  async function logoutUser(){
   localStorage.clear();
   setUser(null);
   setIsAuth(false);
  }

  async function addToPlaylist(id: string) {
  try {
    const { data } = await axios.post(
      `${server}/api/v1/song/${id}`,
      {}, // Empty request body
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    toast.success(data.message);
    fetchUser(); // Update user playlist after toggle
  } catch (error: any) {
    toast.error(error.response?.data?.message || "error occurred");
  }
}


  useEffect(()=>{
     fetchUser();
  },[]);

  return (
    <UserContext.Provider
      value={{ user, isAuth, loading, loginuser, btnloading,registeruser,logoutUser,addToPlaylist }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUserData = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("User data must be use in user provider");
  }
  return context;
};
