import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-heading text-4xl font-bold">404 - Not Found</h2>
            <p className="text-muted-foreground">The page you are looking for does not exist.</p>
            <Link href="/">
                <Button>Return Home</Button>
            </Link>
        </div>
    );
}
