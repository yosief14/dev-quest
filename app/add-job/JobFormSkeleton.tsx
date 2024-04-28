import { Skeleton } from "@/components/ui/skeleton";

export default function JobFormSkeleton() {
    return (
        <div className="flex flex-col rounded-lg relative h-[576px] w-11/12 sm:w-[542px] gap-10 md:w-[700px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 h-fit md:h-[312px] md:gap-7">
                <Skeleton className="sm:h-10 h-12 " />
                <Skeleton className="sm:h-10 h-12 " />
                <Skeleton className="sm:h-10 h-12 " />
                <Skeleton className="sm:h-10 h-12 " />
                <Skeleton className="sm:h-10  h-12" />
                <Skeleton className="sm:h-10 h-12 " />
            </div>
            <Skeleton className="sma:h-9 h-12 " />
            <Skeleton className="h-20" />
        </div>
    )
}