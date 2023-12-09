"use server"
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";
import { Form } from "@prisma/client";
import { string } from "zod";


class UserNotFoundErr extends Error { }

export async function GetFormStats() {
    const user = await currentUser()

    if (!user)
        throw new UserNotFoundErr()

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = stats._sum.visits || 0
    const submissions = stats._sum.submissions || 0

    let submissionRate = 0
    if (visits > 0)
        submissionRate = (submissions / visits) * 100

    const bounceRate = 100 - submissionRate

    return { visits, submissions, submissionRate, bounceRate }
}

interface ActionResponse<T> {
    data: null | T;
    error: string | undefined;
}

export async function CreateForm(data: formSchemaType): Promise<ActionResponse<number>> {

    const response: ActionResponse<number> = {
        data: null,
        error: undefined
    }

    const validation = formSchema.safeParse(data);
    if (!validation.success) {
        response.error = "Form not valid"
        return response
    }

    const user = await currentUser();
    if (!user) {
        response.error = "Unauthorized access for user."
        return response
    }

    const { name, description } = data;
    try {
        const form = await prisma.form.create({
            data: {
                userId: user.id,
                name,
                description,
            },
        });

        response.data = form.id
        return response
    } catch (error) {
        response.error = "Something went wrong, couldn't create the form."
        return response
    }

}

export async function GetForms(): Promise<ActionResponse<Form[]>> {

    const response: ActionResponse<Form[]> = {
        data: null,
        error: undefined
    }

    const user = await currentUser();
    if (!user) {
        response.error = "Unauthorized access for user."
        return response
    }

    try {
        const forms = await prisma.form.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: "desc"
            },
        })

        response.data = forms

        return response
    } catch (error) {
        response.error = "Something went wrong, couldn't fetch the forms."
        return response
    }
}

export async function GetFormById(id: number): Promise<ActionResponse<Form>> {

    const response: ActionResponse<Form> = {
        data: null,
        error: undefined
    }

    const user = await currentUser();
    if (!user) {
        response.error = "Unauthorized access for user."
        return response
    }

    try {
        const form = await prisma.form.findUnique({
            where: {
                userId: user.id,
                id
            },
        })
        response.data = form
        return response
    } catch (error) {
        response.error = "Couldn't find form with this id."
        return response
    }
}

export async function UpdateFormContent(id: number, jsonContent: string): Promise<ActionResponse<Form>> {

    const response: ActionResponse<Form> = {
        data: null,
        error: undefined
    }

    const user = await currentUser();
    if (!user) {
        response.error = "Unauthorized access for user."
        return response
    }

    try {
        const form = await prisma.form.update({
            where: {
                userId: user.id,
                id,
            },
            data: {
                content: jsonContent,
            },
        });
        response.data = form
        return response
    } catch (error) {
        response.error = "Couldn't find form with this id."
        return response
    }

}

export async function PublishForm(id: number) {

    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr
    }

    await prisma.form.update({
        data: {
            published: true,
        },
        where: {
            userId: user.id,
            id,
        },
    });
}


export async function GetFormByUrl(formUrl: string) {
    return await prisma.form.update({
        select: {
            content: true
        },
        data: {
            visits: {
                increment: 1,
            }
        },
        where: {
            shareURL: formUrl,
        }
    })
}

export async function SubmitForm(formUrl: string, content: string) {
    await prisma.form.update({
        data: {
            submissions: { increment: 1 },
            FormSubmissions: {
                create: {
                    content
                },
            },
        },
        where: {
            shareURL: formUrl,
            published: true,
        },
    })
}

export async function GetFormWithSubmissions(id: number) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    return await prisma.form.findUnique({
        where: {
            userId: user.id,
            id,
        },
        include: {
            FormSubmissions: true,
        },
    });
}