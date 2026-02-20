import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

// Premium skeleton with gold shimmer effect
function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-primary/10",
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}

// Card skeleton
function CardSkeleton() {
  return (
    <div className="rounded-xl border border-primary/20 bg-card/50 p-6">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-16 h-16 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

// Hero skeleton
function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <Skeleton className="h-4 w-48 mx-auto mb-6" />
        <Skeleton className="h-16 w-80 mx-auto mb-4" />
        <Skeleton className="h-16 w-64 mx-auto mb-8" />
        <Skeleton className="h-6 w-full max-w-xl mx-auto mb-4" />
        <Skeleton className="h-6 w-3/4 mx-auto mb-12" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-14 w-40 rounded-xl" />
          <Skeleton className="h-14 w-40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// Stats skeleton
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-xl border border-primary/20 bg-card/50 p-6 text-center">
          <Skeleton className="h-10 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  );
}

// Bento grid skeleton
function BentoGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[...Array(count)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// Form skeleton
function FormSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  );
}

export { Skeleton, CardSkeleton, HeroSkeleton, StatsSkeleton, BentoGridSkeleton, FormSkeleton };
