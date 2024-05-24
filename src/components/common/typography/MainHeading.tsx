type Props = {
  title: string;
  customClass?: string;
};
const MainHeading = ({ title, customClass }: Props) => {
  return (
    <div className="">
      <h1
        className={`my-[20px] text-[30px] font-normal text-heading-color ${customClass}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default MainHeading;
