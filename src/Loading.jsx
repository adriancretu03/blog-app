import SkeletonCard from "./components/SkeletonCard";

const Loading = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {"123456789".split("").map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default Loading;
