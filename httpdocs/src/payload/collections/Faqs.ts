import type { CollectionConfig } from "payload"

import { admins } from "../access/admins"
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical"

export const Faqs: CollectionConfig = {
    slug: "faqs",
    labels: {  
        plural: "Preguntas Frecuentes",
        singular: "Pregunta Frecuente"
    },
    admin: {
        group: "ADMIN",
        // defaultColumns: ["email", "active", "masquerade"],
        useAsTitle: 'question',
        defaultColumns: ['question', 'answer', 'section'],
    },
    access: {
        read: admins,
        update: admins,
        create: ()=> true,
        delete: ()=> true,
    },
    fields: [
        {
            name: "question",
            type: "text",
            label: 'Pregunta',
            required: true,
            
        },
        {
            name: "answer",
            type: "richText",
            label: 'Respuesta',
            editor: lexicalEditor({features: ({ defaultFeatures }) => [
                ...defaultFeatures,
                // The HTMLConverter Feature is the feature which manages the HTML serializers.
                // If you do not pass any arguments to it, it will use the default serializers.
                HTMLConverterFeature({}),
              ],
            }),
            required: true,            
        },
        {
            name: 'section',
            type: 'select',
            label: 'Sección',
            options: [
                { label: 'Next.js', value: 'Next.js' },
                { label: 'CSS', value: 'CSS' },
                { label: 'React', value: 'React' },
            ],
            required: true,
            
        },
        lexicalHTML('answer', {name: 'answer_html'}),
    ],
}
