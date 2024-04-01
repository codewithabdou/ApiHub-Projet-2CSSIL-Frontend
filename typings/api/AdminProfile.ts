import { z } from "zod";



export const ProfileAdminSchema = z.object ({

email :z.string(),
avatar:z.string(),
firstname: z.string(),
lastname:z.string(),
phone_number:z.string(),
bio:z.string(),


})

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const UpdateProfileAdminSchema = z.object({

    email :z.string().email().readonly(),
    firstname: z.string().min(2,"Le prénom d'utilisateur doit comporter au moins 2 caractères").max(30, {
      message: "Le prénom d'utilisateur ne doit pas dépasser 30 caractères.",
    }),
    lastname:z.string().min(2,  "Le nom d'utilisateur doit comporter au moins 2 caractères ").max(30, {
      message: "Le nom d'utilisateur ne doit pas dépasser 30 caractères.",
    }),
    phone_number:z.string().regex(phoneRegex, 'Numéro invalide!').min(10,"Numéro invalide!").max(10,"Numéro invalide!"),
    bio:z.string().max(200,"Votre bio ne peux pas passer 200 caractères"),

  
})




export type UpdateAdminProfileRequest = z.infer<typeof UpdateProfileAdminSchema >;


export type successUpdateAdminProfileResponse = {
  status: String;
  message: String;
};


export type errorUpdateAdminProfileResponse= {
  status: String;
  message: String;
};