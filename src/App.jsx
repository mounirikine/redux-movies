import { useEffect, useState } from 'react';
import Header from './components/Header';
import { useDispatch } from 'react-redux';

function App() {
  const [films, setFilms] = useState([]);
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const dispatch = useDispatch()

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=6e30c4b4&s=${search}&type=${type}&y=${year}`);
      const data = await res.json();
      setFilms(data.Search);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFilter();
  }, []); // Empty dependency array to mimic componentDidMount behavior



  const addtocard = (movie)=>{
       dispatch({type:'ADD',payload:movie})
    
  }
  return (
      <>
      <Header />
      
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">
      <div className="flex flex-wrap my-12">
        {/* Search Form */}
        <div className="w-full md:w-1/4 bg-gray-200 p-4">
          <form onSubmit={handleFilter} className="flex flex-col space-y-4">
            <label htmlFor="search" className="text-lg font-semibold">
              Search
            </label>
            <input
              type="text"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-gray-400 p-2 rounded-md"
            />
            <label htmlFor="type" className="text-lg font-semibold">
              Type
            </label>
            <select
              id="type"
              onChange={(e) => setType(e.target.value)}
              className="border-2 border-gray-400 p-2 rounded-md"
            >
              <option value="movies">Movies</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
            <label htmlFor="year" className="text-lg font-semibold">
              Year
            </label>
            <input
              type="text"
              id="year"
              onChange={(e) => setYear(e.target.value)}
              className="border-2 border-gray-400 p-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Movie List */}
        <div className="w-full md:w-3/4 p-4">
          <h1 className="text-3xl font-semibold mb-4">All Movies</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {films.map((item, index) => (
              <div key={index} className="bg-white p-4 shadow-lg rounded-md">
                <div className="flex items-center justify-center">
                  <img src={item.Poster} alt={item.Title} className="w-full h-48 object-cover rounded-md" />
                </div>
                <div className="mt-4">
                  <h1 className="text-xl font-bold">{item.Title}</h1>
                  <p className="text-gray-600">{item.Type}</p>
                </div>
                <div className="pt-6">
                <button onClick={() => addtocard(item)} className="px-4 rounded-lg py-2 bg-blue-500 text-white">
  ADD TO CARD +
</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      </>
  );
}

export default App;
