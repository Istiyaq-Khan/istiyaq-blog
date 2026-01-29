import { getPost } from "@/lib/actions/blog"; // Direct server call for initial data
import EditPostClient from "./client";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: { id: string } }) {
    // Next.js 15: params is async
    const { id } = await Promise.resolve(params);
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return <EditPostClient post={post} />;
}
