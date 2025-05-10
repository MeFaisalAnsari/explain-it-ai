import ThemeToggle from "@/components/ThemeToggle";
import TopicSelector from "@/components/TopicSelector";

export default function Home() {
  return (
    <div className="h-dvh flex">
      <aside className="w-80 bg-secondary"></aside>
      <main className="flex-1 flex flex-col bg-card">
        <header className="h-14 border-b flex justify-between items-center px-6">
          <h1 className="font-bold text-xl">ExplainItLikeImFive</h1>
          <ThemeToggle />
        </header>
        <section className="flex-1 flex flex-col items-center justify-center p-6 text-center mx-auto max-w-3xl">
          <TopicSelector />
        </section>
      </main>
    </div>
  );
}
