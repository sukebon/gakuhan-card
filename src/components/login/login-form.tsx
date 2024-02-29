"use client";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn } from "next-auth/react";
import { Button, Input } from "@nextui-org/react";

type Inputs = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signInHandler(data);
  };
  const signInHandler = async (data: Inputs) => {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      await signIn("credentials", {
        idToken,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
      alert("ログインに失敗しました");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-center mt-2 text-2xl">Login</div>
        <div className="flex flex-col gap-6 mt-3">
          <Input
            type="email"
            labelPlacement="outside"
            label="email"
            placeholder="emailを入力してください"
            errorMessage={errors.email && "emailを入力してください"}
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            labelPlacement="outside"
            label="password"
            placeholder="パスワードを入力してください"
            errorMessage={errors.password && "passwordを入力してください"}
            {...register("password", { required: true })}
          />
          <div className="flex items-center justify-between">
            <Button color="primary" className="w-full" type="submit">
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};