export default function Page({ data }) {
    <>
    <h1>Check out these dogs</h1>
    <div>{data}</div>
    </>
  }
   
  // This gets called on every request
  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
    const data = await res.json()
   
    // Pass data to the page via props
    return { props: { data } }
  }