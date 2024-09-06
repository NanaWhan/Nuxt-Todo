export async function fetchTasks(): Promise<Array<{ id: number; todo: string; completed: boolean; userId: number }>> {
    const response = await fetch('https://dummyjson.com/todos');
    if (!response.ok) {
        throw new Error('Oops...Something went wrong');
    }
    const data = await response.json();
    return data.todos;
}