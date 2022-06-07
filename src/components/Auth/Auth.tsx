import { Button } from "primereact/button";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, authFunction } from "../../utils/supabaseUtils";
import EarthIMG from "./earthimg.jpg";

export default function Auth() {
  const navigate = useNavigate();

  const user = auth.user();

  useEffect(() => {
    if (auth.user()) navigate("/");
  }, [user]);

  return auth.user() ? (
    <Navigate to="/" />
  ) : (
    <div className="w-full h-screen flex align-items-center justify-content-center">
      <div className="surface-card shadow-4 w-full border-round lg:w-6 flex h-full lg:h-20rem flex-wrap">
        <div className="w-full lg:w-7 relative">
          <h1
            className="text-center text-6xl text-white absolute w-full z-5 Merriweather"
            style={{
              textShadow: "0 0 20px black",
            }}
          >
            Discover your world
          </h1>
          <img
            src={EarthIMG}
            className="w-full h-full absolute transition-all transition-duration-200"
            alt="planet placeholder"
          />
        </div>
        <div className="w-full lg:w-5 p-4">
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3 Merriweather">
              Welcome Back
            </div>
            <span className="text-600 font-medium line-height-3 Lato">
              Don't have an account?
            </span>
            <Link
              to="/register"
              className="font-medium no-underline ml-2 text-blue-500 cursor-pointer Lato"
            >
              Register today!
            </Link>
          </div>

          <div>
            <Button
              className="w-full my-2 text-white Lato border-none"
              style={{
                backgroundColor: "#7289DA",
              }}
              onClick={authFunction}
              label="Sign up with Discord"
              icon="pi pi-discord"
              iconPos="right"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}