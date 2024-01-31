import React, { useEffect, useState } from 'react';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Controller, useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged,sendPasswordResetEmail } from 'firebase/auth';
import Home from '../pages/home/index';
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";


const firebaseConfig = {
  apiKey: "AIzaSyDeSlBHQPT0BoII2Nee59SehplpDAakYVE",
  authDomain: "login-173a1.firebaseapp.com",
  projectId: "login-173a1",
  storageBucket: "login-173a1.appspot.com",
  messagingSenderId: "780946775980",
  appId: "1:780946775980:web:60514be5b056e86699e409"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const { handleSubmit, control, reset } = useForm();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const onSubmit = async ({ email, password }) => {
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error('Error en la autenticación:', error.message);
    }

    reset();
  };

  const handleResetPassword = async () => {
    try {
      const email = prompt("Ingrese su dirección de correo electrónico para restablecer la contraseña:");
      console.log('email', email)
      if (email) {
        await sendPasswordResetEmail(auth, email);
        console.log("Correo electrónico enviado para restablecer la contraseña. Verifica tu bandeja de entrada.");
      }
    } catch (error) {
      console.error("Error al enviar el correo electrónico para restablecer la contraseña:", error.message);
    }
  }

  const buttonText = isLoginMode ? "Log in" : "Register";
  const additionalText = isLoginMode ? "You do not have an account?" : "Do you already have an account?";

  return (
    <>
      {loggedIn ? (
        <Home />
      ) : (
        <div className="flex flex-col h-screen items-center p-5 justify-center bg-slate-900">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full max-w-md  p-6 space-y-6 bg-slate-800 text-white rounded-xl shadow-md"
          >
            <div>
              <h1 className="text-2xl font-bold text-center">{isLoginMode ? "Sign in to your account" : "Create Account"}</h1>
              <p className="text-lg text-center">{isLoginMode ? "Enter your credentials" : "Complete the information to register"}</p>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col">
                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      message: 'Password is required.',
                      value: /(.*)/,
                    },
                  }}
                  render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                    <>
                      <label className="text-lg">Email</label>
                      <input
                        onChange={onChange}
                        value={value}
                        type="text"
                        className="w-full p-2 border rounded-md text-black"
                      />
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg">Password</label>
                <div className="relative">
                  <Controller
                    name="password"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: true,
                      pattern: {
                        message: 'Password is required.',
                        value: /(.*)/,
                      },
                    }}
                    render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                      <>
                        <div className="relative">
                          <input
                            value={value}
                            type={showPassword ? 'text' : 'password'}
                            className="w-full p-2 border rounded-md text-black"
                            onChange={(e) => onChange(e.target.value)}
                          />
                          {showPassword ? (
                            <FaRegEyeSlash
                              size={20}
                              color='black'
                              className="absolute right-3 top-3 cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          ) : (
                            <FaRegEye
                              size={20}
                              color='black'
                              className="absolute right-3 top-3 cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          )}
                        </div>
                      </>
                    )}
                  />
                </div>
                {isLoginMode && (
                  <div className="text-right mt-2">
                    <button
                      type="button"
                      className="text-blue-500 text-[13px] hover:underline"
                      onClick={handleResetPassword}
                    >
                      Did you forget your password?
                    </button>
                  </div>
                )}
              </div>
              {/* {!isLoginMode && (
                <div className="flex flex-col">
                  <Controller
                    name="username"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                      <>
                        <label className="text-lg">Nombre</label>
                        <input
                          value={value}
                          type="text"
                          className="w-full p-2 border rounded-md text-black"
                          onChange={onChange}
                        />
                      </>
                    )}
                  />
                </div>
              )} */}
            </div>
            <div className="flex flex-col">
              <button className="bg-blue-500 text-white font-bold text-lg p-2 rounded-md hover:bg-blue-600">
                {buttonText}
              </button>
              <p className="mt-2 text-center text-gray-600">
                {additionalText} <button type="button" className="text-blue-500 hover:underline" onClick={() => setIsLoginMode(!isLoginMode)}>
                  {isLoginMode ? "Register" : "Login in"}
                </button>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
  
  
  
};

export default Login;
