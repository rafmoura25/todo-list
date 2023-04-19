import { Header } from "./components/Header";
import { Assignment } from "./components/Assignment";
import { PlusCircle, ClipboardText } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import styles from "./App.module.css";
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";

import "./global.css";

interface Assignment {
  id: string;
  done: boolean;
  description: string;
}

function App() {
  const [totalCreated, setTotalCreated] = useState(0);
  const [totalDone, setTotalDone] = useState(0);
  const [newAssignText, setNewAssignText] = useState("");
  const [assigns, setAssigns] = useState<Assignment[]>([
    {
      id: uuidv4(),
      done: false,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ]);

  useEffect(() => {
    setTotalCreated(assigns.length);
  }, [assigns]);

  function handleCreateNewAssign(event: FormEvent) {
    event.preventDefault();

    const task: Assignment = {
      id: uuidv4(),
      done: false,
      description: newAssignText,
    };

    setAssigns([...assigns, task]);
    setNewAssignText("");
  }

  function handleNewAssignChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewAssignText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteAssign(assignIdToDelete: string) {
    const assignWithoutDeletedOne = assigns.filter((assign) => {
      return assign.id !== assignIdToDelete;
    });

    setAssigns(assignWithoutDeletedOne);

    const assignCompleted = assignWithoutDeletedOne.filter((assign) => {
      return assign.done === true;
    });

    setTotalDone(assignCompleted.length);
  }

  function completedAssign(state: boolean, id: string) {
    const assignIndex = assigns.findIndex((assign) => assign.id === id);
    assigns[assignIndex].done = !state;

    const assignCompleted = assigns.filter((assign) => {
      return assign.done == true;
    });
    setTotalDone(assignCompleted.length);
    return !state;
  }

  return (
    <div>
      <Header />
      <div className={styles.newAssign}>
        <form onSubmit={handleCreateNewAssign}>
          <input
            type="text"
            value={newAssignText}
            onChange={handleNewAssignChange}
            onInvalid={handleNewCommentInvalid}
            placeholder="Adicione uma nova tarefa"
            required
          />
          <div>
            <button type="submit">
              Criar
              <PlusCircle weight="bold" size={16} />
            </button>
          </div>
        </form>
      </div>

      <div className={styles.assigns}>
        <div className={styles.info}>
          <p className={styles.created}>
            Tarefas criadas <span>{totalCreated}</span>
          </p>
          <p className={styles.done}>
            Concluídas <span>{`${totalDone} de ${totalCreated}`}</span>
          </p>
        </div>
      </div>

      {assigns.length > 0 ? (
        <div className={styles.listTasks}>
          {assigns.map((assign) => {
            return (
              <Assignment
                key={assign.id}
                id={assign.id}
                isDone={assign.done}
                description={assign.description}
                completed={completedAssign}
                deleted={deleteAssign}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.listTasksEmpty}>
          <ClipboardText size={56} />
          <span>Você ainda não tem tarefas cadastradas</span>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      )}
    </div>
  );
}

export default App;
