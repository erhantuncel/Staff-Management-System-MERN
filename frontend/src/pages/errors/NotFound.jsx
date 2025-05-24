import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="mt-40 flex h-screen w-screen flex-col content-center">
            <div className="m-10 mt-2 mb-auto text-center lg:m-20 lg:mt-5 lg:mb-auto">
                <p className="text-9xl">404</p>
                <p className="text-md">
                    The page you are looking for was not found.
                </p>
                <Link to="/" className="btn btn-neutral mt-10">
                    Home Page
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
