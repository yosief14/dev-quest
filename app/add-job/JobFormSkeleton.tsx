import { Skeleton } from "@/components/ui/skeleton";

export default function JobFormSkeleton() {
    return (
        <div className="flex flex-col rounded-lg space-y-10 relative h-[744px] md:w-[700px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}