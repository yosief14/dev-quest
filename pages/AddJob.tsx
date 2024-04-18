"use client"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Outfit } from "next/font/google"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
const outfit = Outfit({ subsets: ['latin'] })
const formSchema = z.object({
    company: z.string().min(3).max(50),
    website: z.string(),
    positionLink: z.string(),
    position: z.string().min(3).max(50),
    postDate: z.date(),
    applicationDate: z.date(),
    location: z.string().max(50),
    description: z.string().min(10).max(4000),
    // logoBackground: z.string(),
    // contract: z.string(),
    // location: z.string(),
    // apply: z.string(),
    // description: z.string(),
    // requirements: z.object({
    //     content: z.string(),
    //     items: z.array(z.string())
    // }),
})

export default function AddJob() {
    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                company: "",
                website: "https://www.google.com",
                positionLink: "https://www.google.com",
                position: "",
                postDate: new Date(),
                applicationDate: new Date(),
                location: "",
                description: "",

            }
        })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <main className={`flex flex-col items-center  bg-dev-grey-blue h-[100vh] ${outfit.className}`}>
            <div className="relative sm:top-48 sm:gap-20 flex bg-white rounded-lg border-opacity-40 shadow-xl sm:p-7 flex-col items">

                <h1 className={`text-3xl font-bold text-center`}>Add a Job</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" rounded-lg space-y-10 relative w-[700px]">
                        <div className="grid grid-cols-2 gap-7">
                            <FormField
                                control={form.control}
                                name='position'
                                render={({ field }) => (
                                    <FormItem className="px-7">
                                        <FormLabel className="text-base font-bold  relative">Position Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='shadcn' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='positionLink'
                                render={({ field }) => (
                                    <FormItem className="px-7 mb-7">
                                        <FormLabel className="text-base font-bold  relative">Job Post Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder='link to the jobPost' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='company'
                                render={({ field }) => (
                                    <FormItem className="px-7 mb-7">
                                        <FormLabel className="text-base font-bold">Company</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Company name' {...field} />
                                        </FormControl>
                                        <FormDescription>

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='website'
                                render={({ field }) => (
                                    <FormItem className="px-7">
                                        <FormLabel className="font-bold text-base">Company's Website</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Website URL' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col px-7">
                                        <FormLabel className=" text-base font-bold">Post Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="applicationDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col px-7">
                                        <FormLabel className=" text-base font-bold">Application Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2">
                        </div>
                        <FormField
                            control={form.control}
                            name='location'
                            render={({ field }) => (
                                <FormItem className="px-7">
                                    <FormLabel className="font-bold text-base">Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder='City, State' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem className="px-7">
                                    <FormLabel className="font-bold text-base">Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Position Description' {...field} className='resize-none' />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

            </div>
        </main>
    )
}