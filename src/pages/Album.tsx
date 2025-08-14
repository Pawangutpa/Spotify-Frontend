import { useParams } from "react-router-dom";
import Layout from "../component/Layout";
import { useSongData } from "../context/songContext";
import { useEffect } from "react";
import Loading from "../component/Loading";
import { FaBook, FaBookmark, FaPlay } from "react-icons/fa";
import { useUserData } from "../context/UserContext";

const Album = () => {
  const {
    fetchAlbumSong,
    albumdata,
    albumsong,
    setSelectedSong,
    loading,
    setIsPlaying,
  } = useSongData();

  const {isAuth,addToPlaylist}=useUserData();

  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (params.id) {
      fetchAlbumSong(params.id);
    }
  }, [params.id]);

  return (
    <div>
      <Layout>
        {albumdata && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                  {albumdata.thumbnail && (
                    <img
                      src={albumdata.thumbnail}
                      className="w-48 rounded"
                      alt=""
                    />
                  )}
                  <div className="flex flex-col">
                    <p>PlayList</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                      {albumdata.title}PlayList
                    </h2>
                    <h4>{albumdata.description}</h4>
                    <p className="mt-1">
                      <img
                        src="/logo.png"
                        className="inline-block w-6"
                        alt=""
                      />
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                  <p>
                    <b className="mr-4">#</b>
                  </p>
                  <p className="hidden sm:block">Description</p>
                  <p className="text-center ">Action</p>
                </div>
                {albumsong &&
                  albumsong.map((song, index) => {
                    return (
                      <div
                        className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b]"
                        key={index}
                      >
                        <p className="text-white">
                          <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                          <img
                            src={
                              song.thumbnail ? song.thumbnail : "/dowload.jpeg"
                            }
                            className="inline w-10 mr-5"
                            alt=""
                          />
                          {""}
                          {song.title}
                        </p>
                        <p className="text-[15px] hidden sm:block">
                          {" "}
                          {song.description.slice(0, 30)}
                        </p>
                        <p className="flex justify-center items-center gap-5">
                          {isAuth &&(<button className="text-[15px] text-center" onClick={()=>{
                             addToPlaylist(song.id);
                          }}>
                              <FaBookmark />
                            </button>)
                            
                          }
                          <button className="text-[15px] text-center" onClick={()=>{
                            setSelectedSong(song.id);
                            setIsPlaying(true);
                          }}>
                            <FaPlay />
                          </button>
                        </p>
                      </div>
                    );
                  })}
              </>
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export default Album;
