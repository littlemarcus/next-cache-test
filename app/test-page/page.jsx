import axios from 'axios';

export default async function Page() {
  const api = axios.create({
    baseURL: 'https://astro-function-site.netlify.app/'
  });

  const serviceToken = 'test-token';
  const hotelId = '123';
  const language = 'en';
  const params = { someParam: 'value' };

  const apiResponse = await api.get(
    `/.netlify/functions/test-endpoint/${hotelId}`,
    {
      headers: {
        Authorization: `Bearer ${serviceToken}`,
        'Cache-Control': 'force-cache'
      },
      params,
      cache: "force-cache",
      next: {
        tags: [`${language}🏨${hotelId}`],
      }
    }
  );
  
  return <div>
    <p>Timestamp: {apiResponse.data.timestamp}</p>
    <p>Random: {apiResponse.data.random}</p>
  </div>;
}