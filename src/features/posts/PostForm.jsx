import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUsersQuery } from "../users/usersSlice";

const formSchema = z.object({
  postTitle: z.string().min(2, {
    message: "Title must have at least 2 characters.",
  }),
  postDescription: z.string().min(10, {
    message: "Description must have at least 10 characters",
  }),
  postContent: z.string().min(10, {
    message: "Article must have at least 10 characters.",
  }),
  postAuthor: z.string(),
});

const PostForm = ({ defaultValues, onSubmit, isLoading }) => {
  const { data: users, isSuccess } = useGetUsersQuery("getUsers");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const canSave =
    form.watch("postTitle") &&
    form.watch("postContent") &&
    form.watch("postDescription") &&
    !isLoading;

  let usersOptions;
  if (isSuccess) {
    usersOptions = users.ids.map((id) => (
      <SelectItem key={id} value={id}>
        {users.entities[id].name}
      </SelectItem>
    ));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Post Title Field */}
        <FormField
          control={form.control}
          name="postTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="postTitle" className="text-lg">
                Title:
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="Your post title"
                  type="text"
                  id="postTitle"
                  name="postTitle"
                />
              </FormControl>
              <FormDescription>Enter the title of the post.</FormDescription>
              <FormMessage>
                {form.formState.errors.postTitle?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Author Field */}
        <FormField
          control={form.control}
          name="postAuthor"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="postAuthor" className="text-lg">
                Author:
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Unknown Author">
                      {field.value
                        ? users?.entities[field.value]?.name
                        : "Unknown Author"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>{usersOptions}</SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select the author for this post.
              </FormDescription>
              <FormMessage>
                {form.formState.errors.postAuthor?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Post Description Field */}
        <FormField
          control={form.control}
          name="postDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="postDescription" className="text-lg">
                Description:
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="w-full"
                  placeholder="Describe your post"
                  id="postDescription"
                  name="postDescription"
                />
              </FormControl>
              <FormDescription>Short description for the post.</FormDescription>
              <FormMessage>
                {form.formState.errors.postDescription?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Post Content Field */}
        <FormField
          control={form.control}
          name="postContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="postContent" className="text-lg">
                Content:
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="w-full"
                  placeholder="Write your content"
                  id="postContent"
                  name="postContent"
                />
              </FormControl>
              <FormDescription>Write the content for the post.</FormDescription>
              <FormMessage>
                {form.formState.errors.postContent?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={!canSave} className="w-full">
          {isLoading ? "Saving..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
