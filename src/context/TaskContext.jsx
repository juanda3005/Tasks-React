import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/tasks";
//debe nombrarse con un alias ya que al tener el mimsmo nombre en el usestate puede generar conflictos

export const TaskContext = createContext();

//TaskContext es el que almacena los datos y TaskContextProvider es el componente que engloba a todos los demas componenetes

//Al crear un contexto todos los demas componenetes pueden acceder a sus metodos yvariables sin tener que hacer una escala exportando de sus componentes padres a sus hijos
export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);

  function createTask(task) {
    setTasks([
      ...tasks,
      {
        title: task.title,
        id: tasks.length,
        description: task.description,
      },
    ]);
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  useEffect(() => {
    setTasks(data);
  }, []);
  //se ejecuta el useeffect cuando es creado el contexto, es decir el componente TaskContextProvider

  return (
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        createTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
