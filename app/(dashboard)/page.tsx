import { GetFormStats, GetForms } from "@/actions/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms, FaEdit } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi";
import CardFormBtn from "@/components/CardFormBtn";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import { Form } from "@prisma/client";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className: string;
}

const StatsCard = ({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: StatsCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-muted-foreground font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
        <p className="text-sm text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
};

async function CardsStatsWrapper() {
  const stats = await GetFormStats();

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title={"Total visits"}
        icon={<LuView />}
        helperText={"All time form visits"}
        value={stats.visits.toLocaleString()}
        loading={false}
        className="shadow-md shadow-blue-600 lg:hover:scale-125 transition ease-in-out delay-150 duration-500 hover:z-[50] sm:hover:scale-100"
      />
      <StatsCard
        title={"Total submissions"}
        icon={<FaWpforms />}
        helperText={"Visits that result in form submission"}
        value={stats.submissions.toLocaleString()}
        loading={false}
        className="shadow-md shadow-yellow-600 lg:hover:scale-125 transition ease-in-out delay-150 duration-500 hover:z-[50] sm:hover:scale-100"
      />
      <StatsCard
        title={"Submission rate"}
        icon={<HiCursorClick />}
        helperText={"All time form visits"}
        value={stats.submissionRate.toLocaleString() + "%"}
        loading={false}
        className="shadow-md shadow-green-600 lg:hover:scale-125 transition ease-in-out delay-150 duration-500 hover:z-[50] sm:hover:scale-100"
      />
      <StatsCard
        title={"Bounce rate"}
        icon={<TbArrowBounce />}
        helperText={"Visits that leaves without interacting"}
        value={stats.bounceRate.toLocaleString() + "%"}
        loading={false}
        className="shadow-md shadow-red-600 lg:hover:scale-125 transition ease-in-out delay-150 duration-500 hover:z-[50] sm:hover:scale-100"
      />
    </div>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant={"destructive"}>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <span>View submissions <BiRightArrowAlt /></span>
          </Button>
        ) : (
          <Button
            asChild
            variant={"secondary"}
            className="w-full mt-2 text-md gap-4"
          >
            <span>Edit form <FaEdit /></span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

async function FormCardContainer() {
  const { data: forms, error } = await GetForms();
  return (
    <>
      {forms?.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="container pt-4">
      <CardsStatsWrapper />
      <Separator className="my-6" />
      <h2 className="font-bold text-4xl col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCardContainer />
        </Suspense>
      </div>
    </div>
  );
}
