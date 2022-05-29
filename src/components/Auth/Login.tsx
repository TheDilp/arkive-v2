import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, login } from "../../utils/supabaseUtils";
import { toastError } from "../../utils/utils";
import EarthIMG from "./earthimg.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  return auth.user() ? (
    <Navigate to="/" />
  ) : (
    <div className="w-full h-screen flex align-items-center justify-content-center">
      <div className="surface-card shadow-4 w-full border-round lg:w-6 flex h-full lg:h-min flex-wrap">
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
            <label
              htmlFor="email"
              className="block text-900 font-medium mb-2 Lato"
            >
              Email
            </label>
            <InputText
              id="email"
              type="text"
              className="w-full mb-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <label
              htmlFor="password"
              className="block text-900 font-medium mb-2 Lato"
            >
              Password
            </label>
            <InputText
              id="password"
              type="password"
              className="w-full mb-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && email && password) {
                  login(email, password)
                    .then((data) => {
                      if (data) navigate("/");
                    })
                    .catch((err) => {
                      toastError("There was an error logging you in");
                    });
                }
              }}
            />

            <Button
              label="Sign In"
              icon="pi pi-user"
              className="w-full text-white Lato"
              onClick={() => {
                if (email && password)
                  login(email, password)
                    .then((data) => {
                      if (data) navigate("/");
                    })
                    .catch((err) => {
                      toastError("There was an error logging you in");
                    });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
