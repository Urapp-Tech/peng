type Props = {
  title: string;
  customClass?: string;
};
const SubHeading = ({ title, customClass }: Props) => {
  return (
    <div className="">
      <h2
        className={`text-[20px] font-normal leading-normal text-heading-color ${customClass}`}
      >
        {title}
      </h2>
    </div>
  );
};

export default SubHeading;
