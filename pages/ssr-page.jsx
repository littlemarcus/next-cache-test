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
        <p>Status: {data.status}</p>
        <span>Random Doggo</span><img src={data.message} alt="random dog" width="300" 
        style={{ 
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }} />
      </main>
    )
  }