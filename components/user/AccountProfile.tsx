"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { updateUser } from "@/actions/user.action";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

interface accountProfileProps {
  user: {
    name: string;
    address: string;
    email: string;
    pincode: string;
  };
}
const AccountProfile: React.FC<accountProfileProps> = ({ user }) => {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(3, { message: " Name is required" }),
    address: z.string().min(3, { message: "Address is required" }),
    email: z.string().min(3, { message: "email is required" }),
    pincode: z.string().min(4, { message: "Pincode is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      address: user?.address || "",
      email: user?.email || "",
      pincode: user?.pincode || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateUser({
      name: values.name,
      email: values.email,
      address: values.address,
      pincode: values.pincode,
    });
    toast.success('Profile Updated');
router.refresh();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-6 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  autoComplete="off"
                  type="text"
                  {...field}
                  className="themes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">Address</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  autoComplete="off"
                  rows={3}
                  {...field}
                  className="themes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">email</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  autoComplete="off"
                  type="email"
                  {...field}
                  className="themes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">Pincode</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  autoComplete="off"
                  type="text"
                  {...field}
                  className="themes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!isValid || isSubmitting}
          type="submit"
          className="bg-blue-500"
        >
          {user.pincode ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
