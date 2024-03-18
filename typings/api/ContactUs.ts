import { z } from "zod";



export const ContactUsSchema = z.object({
    NomComplet: z.string(),
    Objet : z.string(),
    Detail : z.string(),
    Email : z.string(),
})

export const SendContactusSchema = z.object({
    NomComplet: z.string().min(4, { message: "Veuillez entrer un nom complet valide" }),
    Objet: z.string().min(4, { message: "Veuillez entrer un objet valide" }),
    Email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide" }),
    Detail: z.string().min(1, { message: "La description ne peut pas être vide" }).max(2000, { message: "La description ne doit pas dépasser 2000 caractères" }),
});

export type ContactUsRequest = z.infer<typeof SendContactusSchema >;


