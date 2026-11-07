const Page = async () => {
  const text = await Promise.resolve("page")

  return <div>{text}</div>
}

export default Page
