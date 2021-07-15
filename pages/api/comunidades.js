import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

  if (request.method === 'POST') {

    const token = '964dd0d38fa9303558dcb100fe2a4e';
    const client = new SiteClient(token);

    const registroCriado = await client.items.create({
      itemType: '968455',
      ...request.body
    })

    response.json({
      registroCriado: registroCriado,
    })
  }
}