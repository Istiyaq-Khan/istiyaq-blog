import { getPosts, deletePost } from "@/lib/actions/blog";
import { PostsTableClient } from "@/components/admin/posts-table-client";
import { revalidatePath } from "next/cache";

export default async function PostsPage() {
    const { posts } = await getPosts(1, 100); // Fetch first 100 posts for now

    async function deleteAction(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await deletePost(id);
        revalidatePath("/admin/posts");
    }

    return <PostsTableClient posts={posts} deleteAction={deleteAction} />;
}
