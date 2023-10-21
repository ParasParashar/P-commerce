"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
    const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="head-text text-xl text-gray-600">Uh Oh</h2>
        <h3 className="font-light text-lg text-gray-700">Something went wrong!</h3>
        <Button onClick={()=>router.push('/')} variant={'outline'} className="border p-2">
            Refresh
        </Button>
    </div>
  );
};

export default ErrorState;
