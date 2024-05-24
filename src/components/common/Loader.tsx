type Props = {
  type?: string;
};

function Loader({ type }: Props) {
  return type === 'spinner' ? (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
    </div>
  ) : (
    <>
      <div className="h-full w-full" />
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-t-4 border-gray-200" />
      </div>
    </>
  );
}

export default Loader;
