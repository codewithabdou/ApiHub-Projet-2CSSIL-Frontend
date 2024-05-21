"use client"
import React, { useEffect, useState } from 'react'
import SubscriptionsSection from './SubscriptionsSection';
import Keys from './Keys';
import { SubscriptionResponse } from '@typings/api/subscriptionTypes';
function SubscriptionDetails(props:any) {
  
      const [selectedSub,setSelectedSub]=useState<any>(null);
     
  return (
<div className="w-full overflow-x-hidden">
{selectedSub===null ? (<SubscriptionsSection subs={props.subs} setSelectedSub={setSelectedSub}/>) :  <Keys setSelectedSub={setSelectedSub} id={selectedSub.id} /> }
    </div>
  )
}

export default SubscriptionDetails