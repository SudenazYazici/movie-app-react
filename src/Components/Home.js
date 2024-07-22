import { Movies } from "./Movies";
import { MovieTheatres } from "./MovieTheatres";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

export const Home = () => {

    const images = [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/706b9474134343.5c239806af449.jpg",
        "https://www.diariodevenusville.com/wp-content/uploads/2021/03/GODZILLA-VS-KONG-caratula-2.jpg",
        "https://i.pinimg.com/originals/3c/f4/cf/3cf4cf74674ede94488ee71d7ae04ade.jpg",
        "https://webneel.com/wnet/file/images/11-16/8-xmen-movie-poster-design.jpg",
        "https://cdn.wallpapersafari.com/76/85/fFsbXB.jpg",
        "https://dlmag.com/wp-content/uploads/2022/02/Formula-1-Drive-to-Survive-Season-4-release-date.jpg",
    ];

    return(
        <>
        
            <div className="m-10 font-extrabold text-5xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-900">
                    Welcome to Movie Theatre App!
                </span>
            </div>
            <Slide>
                {images.map((image, index) => (
                    <div key={index}>
                        <div className="h-96 bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${image})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
            {/* <Movies/>
            <MovieTheatres/> */}
        </>
        
    );
}