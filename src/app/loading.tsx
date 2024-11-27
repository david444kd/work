export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return (
    <>
      <div className="flex absolute left-0 top-0 items-center justify-center h-screen w-screen ">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
      </div>
    </>
  );
}
