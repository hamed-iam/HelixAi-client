"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/dataEntry";
import { useForm } from "react-hook-form";
import { Button, Spin } from "antd";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    const { data } = await axios.get("http://localhost:5000/captcha");
    setData(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const { handleSubmit, control } = useForm({
    defaultValues: {},
    mode: "all",
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    await axios.post("http://localhost:5000/captcha", data);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center p-24"
      style={{ background: "white" }}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Image
          src={`data:image/png;base64,${data.image}`}
          alt="My Image"
          width={200}
          height={100}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <Input
          control={control}
          name="captcha"
          rules={{
            required: "This field is required",
          }}
        />

        <Button htmlType="submit">Submit</Button>
      </form>
    </main>
  );
}
