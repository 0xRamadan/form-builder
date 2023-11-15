"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex w-full flex-col items-center gap-6 justify-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-destructive">Something went wrong</h2>
      <Button asChild >
        <Link href={"/"}>Go To Home Page</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
