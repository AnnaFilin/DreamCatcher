const ModalContainer = ({ children, onClose }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="
            w-full max-w-2xl max-h-[90vh]
            relative rounded-3xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10
            shadow-xl text-white text-center space-y-6 px-6 py-8
          "
        >
          <div className="absolute inset-0 pointer-events-none bg-white/10 blur-2xl -z-10 rounded-3xl" />
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalContainer;
