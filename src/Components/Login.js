import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        axios.post('https://localhost:7030/api/User/login', data)
            .then(response => {
                const user = response.data;

                console.log('Logging in successful');
                setIsError(false);
                localStorage.setItem('userInfo', user);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('userRole', user.role);
                auth.login(user);
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
                setIsError(true);
            });

    };

    return(
        <>
            {/* <div>
                <input placeholder="Email"/>
                <input placeholder="Password"/>
            </div>
            <button>Login</button> */}

            <div className="max-w-md mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="email" 
                        placeholder="Email" 
                        {...register("email", { required: true })}/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                        className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="password" 
                        placeholder="******************" 
                        {...register("password", { required: true })}/>
                        {/* <p className="text-red-500 text-xs italic">Please enter password.</p> */}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                        {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a> */}
                    </div>
                </form>
            </div>
                
        </>
    );
}