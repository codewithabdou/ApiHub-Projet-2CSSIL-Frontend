import SupplierTickets from '@app/supplier/tickets/page'
import React from 'react'

const page = ({
    params,
  }: {
    params: {
      apiId: number;
    }
}
) => {
  return (
    <SupplierTickets apiId={params.apiId}></SupplierTickets>
  )
}

export default page