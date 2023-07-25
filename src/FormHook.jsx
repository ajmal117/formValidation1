import React, { useState } from "react";
import { useForm } from "react-hook-form";

function FormHook(props) {
  const [userinfo, setUserInfo] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setUserInfo(data);
  };

  console.log(errors);

  return (
    <div>
      <pre className="bg-white text-green-600 rounded-md my-3 p-2 h-32">
        {JSON.stringify(userinfo, undefined, 2)}
      </pre>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 border-2 border-fuchsia-400 rounded-lg flex flex-col justify-between h-[460px] w-[320px]">
        <p className="text-xl font-bold">Form Validation</p>
        <div className="flex flex-col">
          <label htmlFor="" className="text-lg font-medium ">
            Username
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Username is Required",
            })}
            name="name"
            placeholder="username"
            className="bg-gray-300 p-1 text-medium font-medium text-violet-800 rounded-md outline-none px-3"
          />

          <p className="text-red-700">
            {/* {errors.username?.type === 'required' && "Username is required"} */}
            {errors.name?.message}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="text-lg font-medium">
            Email
          </label>
          <input
            type="text"
            name="email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
            placeholder="email"
            className="bg-gray-300 p-1 text-medium font-medium text-violet-800 rounded-md outline-none px-3"
          />
          <p className="text-red-700">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-lg font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            {...register("password", {
              required: " Password is Required",
              maxLength: {
                value: 10,
                message: "must be maximum 10 character",
              },
              minLength: {
                value: 4,
                message: "must be minimum 10 character",
              },
              validate: (char) => {
                return (
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every(
                    (pattern) => pattern.test(char)
                  ) || "must include lower, upper, number, and special chars"
                );
              },
            })}
            placeholder="password"
            className="bg-gray-300 p-1 text-medium font-medium text-violet-800 rounded-md outline-none px-3"
          />
          <p className="text-red-700">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-green-500 rounded-lg p-1 text-lg font-semibold hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormHook;

