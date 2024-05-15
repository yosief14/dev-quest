'use client'
import { Copy } from "lucide-react"
import { Dispatch, SetStateAction, Suspense } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { autoCompleteSchema } from "@/schemas/jobFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
export function AutoCompleteDialog({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
    const form = useForm<z.infer<typeof autoCompleteSchema>>({
        resolver: zodResolver(autoCompleteSchema),
        defaultValues: {
            positionLink: '',
        }
    })

    function onSubmit(values: z.infer<typeof autoCompleteSchema>) {
        console.log(values)
    }
    const FormConponent = () => {
        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="positionLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <button type='submit' className="text-base p-[3px] absolute bottom-6 right-6 ">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                            Auto Fill
                        </div>
                    </button>
                </form>
            </Form>
        )
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md space-y-5">
                <DialogHeader>
                    <DialogTitle className="text-xl mb-5">Auto Complete</DialogTitle>
                    <DialogDescription className="text-base text-black">
                        Paste a link to the job post to get started.
                    </DialogDescription>
                </DialogHeader>
                <FormConponent />
                <DialogFooter className="sm:justify-between ">
                    <DialogClose asChild>
                        <button className="text-base self-center p-[3px] relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                Close
                            </div>
                        </button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
