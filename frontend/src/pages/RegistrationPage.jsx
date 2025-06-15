import { Link } from "react-router";

const RegistrationPage = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="mb-10 text-4xl font-bold">
                        User Registration
                    </h1>
                </div>
                <div className="card bg-base-100 w-full min-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <label className="font-bold">User Name</label>
                        <input type="text" className="input" />
                        <label className="font-bold">Password</label>
                        <input type="password" className="input" />
                        <label className="font-bold">Confirm Password</label>
                        <input type="password" className="input" />
                        <button className="btn btn-neutral mt-4">
                            Register
                        </button>
                    </div>
                </div>
                <div className="mt-10 text-center text-sm">
                    Already have an account?{" "}
                    <Link className="link link-neutral" to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
