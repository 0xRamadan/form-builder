"use server"
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";
import { Form } from "@prisma/client";


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
    error: null | string;
}

export async function CreateForm(data: formSchemaType): Promise<ActionResponse<number>> {

    const response: ActionResponse<number> = {
        data: null,
        error: null
    }

    const validation = formSchema.safeParse(data);
    if (!validation.success) {
        response.error = "Form not valid"
        return response
    }

    const user = await currentUser();
    if (!user) {
        response.error = "unauthorized"
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
        error: null
    }

    const user = await currentUser();
    if (!user) {
        response.error = "unauthorized"
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