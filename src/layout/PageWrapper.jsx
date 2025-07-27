const PageWrapper = ({ children, className = "" }) => {
  return (
    <div
      className={`
        w-full
        max-w-5xl
        mx-auto
        px-4 sm:px-6 md:px-8
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
