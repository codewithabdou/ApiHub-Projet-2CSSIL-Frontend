"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@app/components/ui/alert-dialog"
import { Trash2Icon } from 'lucide-react'
import deleteDiscussion from '@services/api/apiPage/deleteDiscussion'
import { toast } from 'sonner';
  
function DeleteDiscussionPopUp(props:any) {
   async function handleClick(){
       const result=await deleteDiscussion(props.apiId,props.discussionId);
       if (result.status==="success") {
        toast("Message", {
          description: "La discussion a été supprimée avec success",
          action: {
            label: "Ok",
            onClick: () => console.log("Undo"),
          }}
         
    );
       } else {
        toast("Message", {
          description: "Erreur lors de la suppression",
          action: {
            label: "Ok",
            onClick: () => console.log("Undo"),
          }}
    )
       }
    }
  return (
    <AlertDialog>
  <AlertDialogTrigger><Trash2Icon className='text-primary w-4 cursor-pointer'/></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Etes-vous sur de vouloir supprimer cette discussion?</AlertDialogTitle>
      <AlertDialogDescription>
       Cette action est irreversible,la suppression est permanante.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Annuler</AlertDialogCancel>
      <AlertDialogAction onClick={handleClick}>Supprimer</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteDiscussionPopUp