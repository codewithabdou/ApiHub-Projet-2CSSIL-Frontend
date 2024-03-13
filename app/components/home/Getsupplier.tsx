import React from 'react'

import { Table,TableHeader,TableFooter,TableHead,TableRow,TableCell,TableCaption, TableBody } from '../ui/table'



// export {
//     Table,
//     TableHeader,
//     TableBody,
//     TableFooter,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableCaption,
//   }
  

const Getsupplier = () => {
  return (
    <div> 

<div>

    <h1>Liste des fournisseurs</h1>


    <div className="TableFournisseur">

    <Table>
  <TableCaption>Liste des fournisseurs</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>ID</TableHead>
      <TableHead>Username</TableHead>
      <TableHead className="text-right">Email</TableHead>
      <TableHead className="text-right">Nombre d'API</TableHead>

    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      {/* <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell> */}
    </TableRow>
  </TableBody>
</Table>


    </div>
</div>

    </div>
  )
}

export default Getsupplier