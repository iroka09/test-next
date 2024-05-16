

export default function ({ params: { status }, searchParams: { message } }) {
  return (<>
    <h2>{status}: {message}.</h2>
  </>)
}