export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-4xl font-bold">404 — Page not found</h1>
        <p className="mt-2 text-slate-500">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <a className="btn btn-primary mt-4" href="/">
          Go Home
        </a>
      </div>
    </main>
  );
}
