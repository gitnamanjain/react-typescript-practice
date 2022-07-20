interface ITodo{
  list:{
    todo: string;
    id: number;
  }[];
}
function Todo(props:any) {
  return (
    <>
      <div>
        <ol>
          {props.list.map((item:any) => (
            <>
              <li>{item.todoItem}</li>
              <button onClick={() => props.handleDelete(item.id)}>
                Delete
              </button>
            </>
          ))}
        </ol>
      </div>
    </>
  );
}

export default Todo;
