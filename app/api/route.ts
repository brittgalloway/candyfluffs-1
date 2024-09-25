import { NextResponse } from 'next/server'


const getStock = async () => {
  const url = 'https://app.snipcart.com/api/products/DatoCmsProduct-11006248-en';
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${process.env.API_AUTH}`,
      'content-type': 'application/json'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
getStock();
// export const GET = async (request: Request, { params }) => {
//   const data = await db.todo.findUnique({ where: { id: params.id } })
//   return NextResponse.json({ data })
// }