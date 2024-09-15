function Parent() {
  const title = "Monitor"
  return (
      <Child text={title} />
  )
}

function Child(props: { text: string }) {
  return <div>{props.text}</div>
}
