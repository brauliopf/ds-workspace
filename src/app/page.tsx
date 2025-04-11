export default function Home() {
  return (
    <div className="flex flex-col min-h-full p-8">
      <div className="p-4 rounded-md bg-muted mb-6">
        <h1 className="text-2xl font-semibold mb-2">
          Building Your Application
        </h1>
        <ol className="list-decimal pl-5 space-y-1">
          <li className="text-sm">Data Fetching</li>
        </ol>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Start with Next.js</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                src/app/page.tsx
              </code>
              .
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">UI Components</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Based on the shadcn/ui Sidebar design example.
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Responsive Design</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Adapts to different screen sizes with mobile support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
