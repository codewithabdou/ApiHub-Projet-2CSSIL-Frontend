export function getAllTickets(apiId: number) {
  return [
    {
      id: 1,
      title: 'Ticket #00001',
      description: 'i have a problem with my account , i can not login to my account , please help me to solve this problem , thank you i have a problem with my account , i can not login to my account , please help me to solve this problem , thank you',
      status: 'Open',
      dateCreate: '2022-02-24'
    },
    {
        id: 2,
        title: 'Ticket #00002',
        description: ' i have a problem with the payment , i can not pay for the subscription , please help me to solve this problem , thank you',
        status: 'Closed',
            dateCreate: '2022-02-24', 
            solution : ' the problem was solved by the support team , the user can now pay for the subscription , and the following steps must be followed to pay for the subscription , in addition to that the user can now pay for the subscription using the credit card or the paypal account'
        },
        {
        id: 3,
        title: 'Ticket #00003',
        description: ' Having a problem with the API , i can not get the data from the API , please help me to solve this problem , thank you',
        status: 'In progress',
            dateCreate: '2022-02-24'
    }
  ]
}