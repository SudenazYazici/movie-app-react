import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const AdminRegister = () => {
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        const registrationData = { ...data, role: "admin" };
        axios.post('https://localhost:7030/api/User/register', registrationData)
            .then(response => {
                console.log('Registration successful', response.data);
                setIsError(false);
                navigate('/login');
            })
            .catch(error => {
                console.error('There was an error registering!', error);
                setIsError(true);
            });
    };

    return(
        <>
            
            
            <div className="max-w-md mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-black font-bold my-4'>Admin Register</div>
                    <div className="mb-4 form-control">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user-name">
                            User name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="user-name" type="text" placeholder="User name" {...register("name", { required: true })}/>
                    </div>
                    <div className="mb-4 form-control">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" {...register("email", { required: true })}/>
                    </div>
                    <div className="mb-4 form-control">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birth-date">
                            Birth date
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="birth-date" type="text" placeholder="yyyy-MM-dd" {...register("birthdate", { required: true })}/>
                    </div>
                    <div className="mb-6 form-control">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" {...register("password", { required: true })}/>
                        <p className="text-orange-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between form-control">
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign Up
                        </button>
                        {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a> */}
                        <Link to={`/login`} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Already have an account? Log in.
                        </Link>
                    </div>
                    {isError && <p className="mt-5 text-red-500 text-xs italic">There was an error registering! Please try again.</p>}
                </form>
            </div>

        </>
    );
}