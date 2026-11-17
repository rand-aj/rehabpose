import Link from "next/link";
import { ROUTES } from "@/core/routes";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-2xl text-center">
        {/* Project Name */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-slate-900 mb-3">
          REHABPOSE
        </h1>

        <p className="text-xs md:text-sm font-medium tracking-widest text-slate-500 mb-10">
          REHABILITATION EXERCISE EVALUATION SYSTEM
        </p>

        {/* Welcome Card */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/60">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Welcome to REHABPOSE
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-8 max-w-lg mx-auto mb-8">
            Your rehabilitation journey starts here.
            <br />
            Evaluate your movements and monitor your progress.
          </p>

          {/* Next Button */}
          <Link
            href={ROUTES.EXERCISES}
            className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3.5 rounded-xl shadow-md shadow-blue-200 transition-colors"
          >
            Get Started
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
