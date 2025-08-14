import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useSongData } from "../context/songContext";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const server = "http://43.204.228.93:8002";

const Admin = () => {

  const navigate = useNavigate();
  const { user } = useUserData();
  const { albums, songs, fetchSongs, fetchAlbums } = useSongData();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [btnloading, setBtnLoading] = useState<boolean>(false);
  const [album, setAlbum] = useState<string>("");

  const fileChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const addAlbumHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/album/new`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchAlbums();
      setBtnLoading(false);
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (error: any) {
      toast.error(error.respnose?.data?.message);
      setBtnLoading(false);
    }
  };

  const addSongHandler = async (e: FormEvent) => {

    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("album", album);
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/song/new`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchSongs();
      setBtnLoading(false);
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (error: any) {
      toast.error(error.respnose?.data?.message);
      setBtnLoading(false);
    }
  };
  const addThumbnailHandler = async (id: string) => {
    
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/song/${id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchSongs();
      setFile(null);
      setBtnLoading(false);
    } catch (error: any) {
      toast.error(error.respnose?.data?.message);
      setBtnLoading(false);
    }
  };

  const  deletealbum=async(id:string)=>{
    if(confirm("Are you sure you want to delete this album?")){
      setBtnLoading(true);
      try {
         const { data } = await axios.delete(
        `${server}/api/v1/album/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
       toast.success(data.message);
      fetchSongs(); 
      fetchAlbums();
      setBtnLoading(false);
      } catch (error:any) {
         toast.error(error.respnose?.data?.message);
        setBtnLoading(false);
        
      }
    }
  }
  const  deletesong=async(id:string)=>{
    if(confirm("Are you sure you want to delete this song?")){
      setBtnLoading(true);
      try {
         const { data } = await axios.delete(
        `${server}/api/v1/song/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
       toast.success(data.message);
      fetchSongs(); 
      fetchAlbums();
      setBtnLoading(false);
      } catch (error:any) {
         toast.error(error.respnose?.data?.message);
        setBtnLoading(false);
        
      }
    }
  }
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link
        to={"/"}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
      >Go to home page
      </Link>
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>
      <form
        className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4"
        onSubmit={addAlbumHandler}
      >
        <input
          type="text"
          placeholder="Title"
          className="auth-input"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          placeholder="Choose Thumbnail"
          className="auth-input"
          accept="image/*"
          onChange={fileChangehandler}
          required
        />
        <button
          className="auth-btn"
          style={{ width: "100px" }}
          disabled={btnloading}>
          {btnloading ? "Please wait..." : "Add"}
        </button>
      </form>
       <h2 className="text-2xl font-bold mb-6 mt-6">Add Song</h2>
      <form
        className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4"
        onSubmit={addSongHandler}
      >
        <input
          type="text"
          placeholder="Title"
          className="auth-input"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="auth-btn"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          required
        >
          <option value="">Choose album</option>
          {albums?.map((e: any, i: number) => {
            return (
              <option value={e.id} key={i}>
                {e.title}
              </option>
            );
          })}
        </select>
        <input
          type="file"
          onChange={fileChangehandler}
          placeholder="Choose audio"
          className="auth-input"
          accept="audio/*"
          required
        />
        <button
          className="auth-btn"
          style={{ width: "100px" }}
          disabled={btnloading}
        >
          {btnloading ? "Please wait..." : "Add"}
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Addeed Albums</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {albums?.map((e, i) => {
            return (
              <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={i}>
                <img src={e.thumbnail} className="mr-1 w-52 h-52" alt="" />
                <h4 className="text-lg font-bold">{e.title.slice(0,20)}...</h4>
                <h4 className="text-lg font-bold">
                  {e.description.slice(0, 30)}
                </h4>
                <button
                  disabled={btnloading}
                  className="px-3 py-1 bg-red-500 text-white  rounded"
                  onClick={()=>deletealbum(e.id)}
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Addeed Songs</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {songs?.map((e, i) => {
            return (
              <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={i}>
                {e.thumbnail ? (
                  <img src={e.thumbnail} className="mr-1 w-52 h-52" alt="" />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2 w-[250px]">
                    <input type="file" onChange={fileChangehandler} />
                    <button
                      className="auth-btn"
                      style={{ width: "200px" }}
                      disabled={btnloading}
                      onClick={()=>addThumbnailHandler(e.id)}
                    >
                      {btnloading ? "Please wait.. " : "add thumbnail"}
                    </button>
                  </div>
                )}
                <h4 className="text-lg font-bold">{e.title.slice(0, 20)}..</h4>
                <h4 className="text-lg font-bold">
                  {e.description.slice(0, 30)}
                </h4>
                <button
                  disabled={btnloading}
                  className="px-3 py-1 bg-red-500 text-white  rounded"
                  onClick={()=>deletesong(e.id)}
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
