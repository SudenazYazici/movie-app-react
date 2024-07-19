import './App.css';
import './output.css';
import './input.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { Home } from './Components/Home';
import { Movies } from './Components/Movies';
import { MovieTheatres } from './Components/MovieTheatres';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import { BookTickets } from './Components/BookTickets';
import { MovieDetails } from './Components/MovieDetails';
import { NoMatch } from './Components/NoMatch';
import { Profile } from './Components/Profile';
import { AuthProvider } from './Components/auth';
import { UserTickets } from './Components/UserTickets';
import { Admin } from './Components/Admin';
import { AdminRegister } from './Components/AdminRegister';


function App() {
  return (
    
      <AuthProvider>
        <Navbar/>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='movies' element={<Movies/>}/>
            <Route path='movies/:id' element={<MovieDetails/>}/>
            <Route path='movie-theatres' element={<MovieTheatres/>}/>
            <Route path='book-tickets' element={<BookTickets/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='tickets' element={<UserTickets/>}/>
            <Route path='admin' element={<Admin/>}/>
            <Route path='admin-register' element={<AdminRegister/>}/>
            <Route path='*' element={<NoMatch/>}/>
          </Routes>
        </div>
      </AuthProvider>
    
  );
}

export default App;
