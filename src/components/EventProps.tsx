function Parent() {
  const title = "Monitor";
  const handleClick = () => {
    alert(title + " selected");
  };
  return <Child text={title} handleClick={handleClick} />;
}

interface ChildProps {
  text: string;
  handleClick(): void;
}

function Child(props: ChildProps) {
  return <div onClick={props.handleClick}>{props.text}</div>;
}

export default Parent;
