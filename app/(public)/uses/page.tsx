import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
    title: "Uses | Istiyaq Khan",
    description: "Software, gadgets, and tools I use.",
};

export default function UsesPage() {
    const categories = [
        {
            title: "Content Systems",
            items: [
                { name: "Notion", desc: "My second brain and content calendar database." },
                { name: "Obsidian", desc: "For deep work, research notes, and zettelkasten." },
                { name: "n8n", desc: "For automating backend workflows and API connections." },
                { name: "StartGrid", desc: "For analyzing YouTube hook/title performance." } // Inferred/Generic
            ]
        },
        {
            title: "Development",
            items: [
                { name: "VS Code", desc: "The only editor I need. Heavily customized." },
                { name: "Next.js", desc: "My go-to framework for shipping web apps fast." },
                { name: "Cursor", desc: "The AI code editor I'm currently experimenting with." },
                { name: "MongoDB", desc: "Flexible NoSQL database for content blocks." }
            ]
        },
        {
            title: "Creative",
            items: [
                { name: "Adobe After Effects", desc: "For motion graphics (Neon Purple vibe)." },
                { name: "Premiere Pro", desc: "For editing long-form YouTube videos." },
                { name: "Figma", desc: "For UI design and thumbnail mocking." }
            ]
        }
    ];

    return (
        <Section>
            <Container>
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h1 className="font-heading text-4xl font-bold">Uses</h1>
                        <p className="max-w-xl text-lg text-muted-foreground">
                            A living collection of the hardware, software, and tools I rely on to create content and write code.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((cat) => (
                            <Card key={cat.title} className="h-full">
                                <CardHeader>
                                    <CardTitle>{cat.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {cat.items.map((item) => (
                                        <div key={item.name}>
                                            <div className="font-medium text-foreground">{item.name}</div>
                                            <div className="text-sm text-muted-foreground">{item.desc}</div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
