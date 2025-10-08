export default function ErrorPage() {
  return (
    <main className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-slate-500">
          If you refreshed a deep link (like /admin) on a static host, it might be a routing issue.
        </p>
        <a className="btn btn-primary mt-4" href="/">Go home</a>
      </div>
    </main>
  );
}
