const DesignDropArea = () => {
  return (
    <div className="p-4 w-full">
      <div className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-center flex-1 overflow-y-auto">
        <p className="text-3xl font-bold text-muted-foreground flex flex-grow items-center">
          Drop here
        </p>
      </div>
    </div>
  );
};

export default DesignDropArea;
