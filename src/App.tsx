import { Header } from "./components/Header";
import { PlusCircle, ClipboardText } from "phosphor-react";

import styles from "./App.module.css";

import "./global.css";
import { useState } from "react";

function App() {
  const [totalCreated, setTotalCreated] = useState(0);
  const [totalDone, setTotalDone] = useState(0);
  return (
    <div>
      <Header />
      <div className={styles.newTask}>
        <form>
          <input type="text" placeholder="Adicione uma nova tarefa" required />
          <div>
            <button type="submit">
              Criar
              <PlusCircle weight="bold" size={16} />
            </button>
          </div>
        </form>
      </div>

      <div className={styles.tasks}>
        <div className={styles.info}>
          <p className={styles.created}>
            Tarefas criadas <span>{totalCreated}</span>
          </p>
          <p className={styles.done}>
            Concluídas <span>{`${totalDone} de ${totalCreated}`}</span>
          </p>
        </div>
      </div>

      <div className={styles.listTasksEmpty}>
        <ClipboardText size={56} />
        <span>Você ainda não tem tarefas cadastradas</span>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  );
}

export default App;
