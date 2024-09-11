import { Skeleton } from "./ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const SkeletonCard = () => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center gap-1">
          <Skeleton className="w-12 h-12 rounded-full"></Skeleton>
          <Skeleton className="w-1/3 h-4"></Skeleton>
          <Skeleton className="w-1/3 h-4"></Skeleton>
        </div>
        <div>
          <Skeleton className="h-6 flex-grow"></Skeleton>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 flex-grow mt-4"></Skeleton>
        <Skeleton className="h-4 flex-grow mt-4"></Skeleton>
        <Skeleton className="h-4 w-1/2 mt-4"></Skeleton>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-20"></Skeleton>
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
