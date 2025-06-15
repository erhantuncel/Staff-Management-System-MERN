import { Link } from "react-router";

const LoginPage = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="mb-10 text-4xl font-bold">User Login</h1>
                </div>
                <div className="card bg-base-100 w-full min-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <label className="font-bold">User Name</label>
                        <input type="text" className="input" />
                        <label className="font-bold">Password</label>
                        <input type="password" className="input" />
                        <button className="btn btn-neutral mt-4">Login</button>
                    </div>
                </div>
                <div className="mt-10 text-center text-sm">
                    Don't have an account yet?{" "}
                    <Link className="link link-neutral" to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
