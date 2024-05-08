'use client'
import 'react-quill/dist/quill.snow.css'
import JobFormSkeleton from "./JobFormSkeleton"
import { format } from "date-fns"
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
import { useToast } from "@/components/ui/use-toast"
import { addJob } from "@/db/services/jobs"
import { useState } from "react"
import { jobFormSchema } from "@/schemas/jobFormSchema"
import { JobFormInterface } from "@/interfaces/jobFormInterface"
import dynamic from "next/dynamic"

const ReactQuillNoSSR = dynamic(() => import("react-quill"), { ssr: false })
const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]
export default function AddJob({ edit, jobData }: JobFormInterface) {
    //TODO change to Suspense maybe https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#programmatic-form-submission
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast()

    const form = useForm(
        {
            resolver: zodResolver(jobFormSchema),
            defaultValues: jobData || {
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

    async function onSubmit(values: z.infer<typeof jobFormSchema>) {
        console.log("🚀 ~ onSubmit ~ values:", values)
        const result = true //await addJob(values)
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
            <>
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
                                <FormItem className="px-7 mt-5">
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
                                <FormItem className="px-7 mt-5">
                                    <FormLabel className="font-bold text-base">Description</FormLabel>
                                    <FormControl>
                                        <ReactQuillNoSSR
                                            theme="snow"
                                            value={field.value}
                                            onChange={field.onChange}></ReactQuillNoSSR>
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <button className="w-52  mt-10 text-lg self-center p-[3px] relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                Submit
                            </div>
                        </button>
                    </form>
                </Form>
            </>
    )
}

