type Props = {
  type?: string;
};

function Loader({ type }: Props) {
  return type === 'spinner' ? (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <>
      <div className="h-full w-full" />
      <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-200"></div>
      </div>
    </>
  );
}

export default Loader;
