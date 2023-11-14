import { GetFormStats } from "@/actions/forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
import { LuView } from 'react-icons/lu'
import { FaWpforms } from 'react-icons/fa'
import { HiCursorClick } from 'react-icons/hi'
import { TbArrowBounce } from 'react-icons/tb'


interface StatsCardProps {
    title: string;
    icon: ReactNode;
    helperText: string;
    value: string;
    loading: boolean;
    className: string;
}

const StatsCard = ({ title, icon, helperText, value, loading, className }: StatsCardProps) => {

    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="font-bold text-2xl">
                    {
                        loading ? <Skeleton><span className="opacity-0">0</span></Skeleton> : value
                    }
                </div>
                <p className="text-sm text-muted-foreground pt-1">{helperText}</p>
            </CardContent>
        </Card>
    )
}


async function CardsStatsWrapper() {
    const stats = await GetFormStats()

    return (
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title={"Total visits"}
                icon={<LuView />}
                helperText={"All time form visits"}
                value={stats.visits.toLocaleString()}
                loading={false}
                className="shadow-md shadow-blue-600 hover:scale-125 transition ease-in-out delay-150 duration-500"
            />
            <StatsCard
                title={"Total submissions"}
                icon={<FaWpforms />}
                helperText={"All time form submissions"}
                value={stats.submissions.toLocaleString()}
                loading={false}
                className="shadow-md shadow-yellow-600 hover:scale-125 transition ease-in-out delay-150 duration-500"
            />
            <StatsCard
                title={"Submission rate"}
                icon={<HiCursorClick />}
                helperText={"All time form visits"}
                value={stats.submissionRate.toLocaleString() + "%"}
                loading={false}
                className="shadow-md shadow-green-600 hover:scale-125 transition ease-in-out delay-150 duration-500"
            />
            <StatsCard
                title={"Bounce rate"}
                icon={<TbArrowBounce />}
                helperText={"All time form visits"}
                value={stats.bounceRate.toLocaleString() + "%"}
                loading={false}
                className="shadow-md shadow-red-600 hover:scale-125 transition ease-in-out delay-150 duration-500"
            />
        </div>
    )
}


export default function Home() {
    return (
        <div className="container pt-4">
            <CardsStatsWrapper />
            <Separator className="my-6" />
            <h2 className="font-bold text-4xl col-span-2">Your forms</h2>
            <Separator className="my-6" />
        </div>
    )
}
