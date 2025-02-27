export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await res.json()
    // Pass data to the page via props
    return { props: { data } }
  }
   
  export default function Page({ data }) {
    return (
      <main>
        <p>{data}</p>
      </main>
    )
  }