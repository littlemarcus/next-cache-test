// import axios from 'axios';

// export default async function Page() {
//   const api = axios.create({
//     baseURL: 'https://astro-function-site.netlify.app'
//   });

//   const serviceToken = 'test-token';
//   const hotelId = '123';
//   const language = 'en';
//   const params = { someParam: 'value' };

//   const apiResponse = await api.get(
//     `/.netlify/functions/test-endpoint/${hotelId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${serviceToken}`,
//         'Cache-Control': 'force-cache'
//       },
//       params,
//       cache: "force-cache",
//       next: {
//         tags: [`${language}🏨${hotelId}`],
//       }
//     }
//   );
  
//   return <div>
//     <h1>Test Page</h1>
//     <p>Timestamp: {apiResponse.data.timestamp}</p>
//     <p>Random: {apiResponse.data.random}</p>
//   </div>;
// }


// copying customer setup

// import merge from 'deepmerge';
// import fetchRetry from 'fetch-retry';
// export const dynamic = 'force-dynamic';
// export default async function Page() {
//     const serviceToken = 'test-token';
//     const hotelId = '123';
//     const language = 'en';
//     const params = { someParam: 'value' };

//     const apiResponse = await get(`/.netlify/functions/test-endpoint/${hotelId}`, {
//         headers: {
//             Authorization: `Bearer ${serviceToken}`
//             //'Cache-Control': 'force-cache'
//         },
//         params,
//         cache: undefined,
//         next: {
//             revalidate: 60 * 60 * 24,
//             tags: [`${language}:${hotelId}`]
//         }
//     });

// console.log('Response headers:', Object.fromEntries(apiResponse.headers.entries()));
// console.log('Cache status:', apiResponse.headers.get('x-vercel-cache'));
// console.log('Next-Cache:', apiResponse.headers.get('x-next-cache'));
// console.log('Cache-Control:', apiResponse.headers.get('cache-control'));

//     const response = await apiResponse.json();

//     return (
//         <div>
//             <h1>Test Page</h1>
//             <p>Timestamp: {response.timestamp}</p>
//             <p>Random: {response.random}</p>
//         </div>
//     );
// }

// const defaultOptions = {
//     cache: 'no-store',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//     },
//     mode: 'cors'
// };

// const wrappedFetch = fetchRetry(fetch, {
//     retries: 3,
//     retryDelay: function (attempt) {
//         return Math.pow(2, attempt) * 150; // 150, 300, 600
//     }
// });

// export async function get(endpoint, options, params = {}) {
//     const url = new URL(endpoint, 'https://astro-function-site.netlify.app');
//     url.search = new URLSearchParams(params).toString();
//     console.log('GET', url);
//     return wrappedFetch(url, merge.all([defaultOptions, { method: 'GET' }, options]));
// }


export const dynamic = 'force-dynamic';
export default async function Page() {
    const serviceToken = 'test-token';
    const hotelId = '123';
    const language = 'en';
    const params = { someParam: 'value' };

    console.log('About to make time API request with options:', {
        cache: 'no-store'
    });

    const timeApi = await fetch('https://timeapi.io/api/time/current/zone?timeZone=Europe%2FAmsterdam', {
        cache: 'no-store'
    });

    console.log('Time API response headers:', Object.fromEntries(timeApi.headers.entries()));

    const longKey='AsuperlongcachekeythatwillbreakthecacheAsuperlongcachekeythatwillbreakthecacheAsuperlongcachekeythatwillbreakthecacheAsuperlongcachekeythatwillbreakthecacheAsuperlongcachekeythatwillbreakthecache{Asuperlongcachekeythatwillbreakthecache:"Asuperlongcachekeythatwillbreakthecache"}Asuperlongcachekeythatwillbreakthecache'

    const apiResponse = await fetch(
        `https://astro-function-site.netlify.app/.netlify/functions/test-endpoint/${hotelId}`,
        {
            headers: {
                Authorization: `Bearer ${serviceToken}`
                //'Cache-Control': 'force-cache'
            },
            params,
            cache: undefined,
            next: {
                revalidate: 60 * 60 * 24,
                tags: [`${language}:${hotelId}:${longKey}`]
            }
        }
    );

    console.log('Cached API response headers:', Object.fromEntries(apiResponse.headers.entries()));


    const response = await apiResponse.json();
    const timeResponse = await timeApi.json();

    return (
        <div>
            <h1>Test Page</h1>
            <p>UNCACHED: {timeResponse.dateTime}</p>
            <p>Timestamp: {response.timestamp}</p>
            <p>Random: {response.random}</p>
        </div>
    );
}