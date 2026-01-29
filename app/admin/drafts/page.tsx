import { getPosts, deletePost } from "@/lib/actions/blog";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function DraftsPage() {
    // Fetch only drafts
    const { posts } = await getPosts(1, 100, { status: "draft" });

    async function deleteAction(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await deletePost(id);
        revalidatePath("/admin/drafts");
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-heading text-3xl font-bold">Drafts</h1>
                <Link href="/admin/posts/new">
                    <Button>Create Post</Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No drafts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            posts.map((post: any) => (
                                <TableRow key={post._id}>
                                    <TableCell className="font-medium">
                                        {post.title || "Untitled Draft"}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/posts/${post._id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <form action={deleteAction}>
                                                <input type="hidden" name="id" value={post._id} />
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
