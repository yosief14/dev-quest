'use client'
import JobFormSkeleton from "./JobFormSkeleton"
import { format, set } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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
import { useToast } from "@/components/ui/use-toast"
import { addJob } from "@/db/services/jobs"
import { useState } from "react"
const formSchema = z.object({
    company: z.string().min(3).max(50),
    companySite: z.string().url(),
    positionLink: z.string(),
    positionTitle: z.string().min(3).max(50),
    applicationDate: z.date(),
    postDate: z.date(),
    location: z.string().max(50),
    description: z.string().min(10).max(10000),
})
export default function AddJob() {
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast()
    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                company: "",
                companySite: "",
                positionLink: "",
                positionTitle: "",
                postDate: new Date(),
                applicationDate: new Date(),
                location: "",
                description: "",

            }
        })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await addJob(values)
        setSubmitting(true)
        let toastMessage = {} as any
        if (result) {
            form.reset()
            toastMessage = {
                title: `${values.positionTitle} added`,
                description: "Your job has been added! Check it out in the jobs page",
                variant: "success",
            }
        }
        else {
            toastMessage = {
                title: "Error",
                description: "There was an error adding your job",
                variant: "destructive",
            }
        }
        setTimeout(() => {
            setSubmitting(false)
            toast(toastMessage)
        }, 1000)
    }

    return (
        submitting ? <JobFormSkeleton /> :

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col rounded-lg relative w-full md:w-[700px] ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        <FormField
                            control={form.control}
                            name='positionTitle'
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
                            name='companySite'
                            render={({ field }) => (
                                <FormItem className="px-7">
                                    <FormLabel className="font-bold text-base">Company URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Website URL" {...field} />
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
                                                        "  text-left font-normal",
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
                                                        "pl-3 text-left font-normal",
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
                    <Button type="submit" className="w-52 mt-10 text-lg self-center">Submit</Button>
                </form>
            </Form>
    )
}