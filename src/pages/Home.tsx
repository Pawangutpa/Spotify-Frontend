import Albumcard from '../component/Albumcard';

import Layout from '../component/Layout'
import Loading from '../component/Loading';
import SongCard from '../component/SongCard';
import { useSongData } from '../context/songContext'

const Home = () => {
  const {albums,songs,loading}=useSongData();
  console.log("albums:", albums);
  return (
    <div>
      {loading?(<Loading/>):
      <Layout>
      <div className='mb-4'>
        <h1  className='my-5 font-bold text-2xl'> Featured Charts</h1>
          <div className='flex overflow-auto'> 
            {
           albums?.map((e,i)=>{
            return <Albumcard key={i} image={e.thumbnail} desc={e.description} id={e.id} name={e.title}/>})
          }
          </div>
      </div>
      <div className='mb-4'>
        
        <h1  className='my-5 font-bold text-2xl'> Today's Hits</h1>
          <div className='flex overflow-auto'> 
            {
           songs?.map((e,i)=>{
            
            return <SongCard key={i} image={e.thumbnail} desc={e.description} id={e.id} name={e.title}/>})
          }
          </div>
      </div>
      </Layout>
      }
    </div>
  )
}

export default Home
