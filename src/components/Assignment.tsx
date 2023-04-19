import { Trash } from "phosphor-react"
import { useState } from "react";

import styles from "./Assignment.module.css";

interface props {
  id: string;
  isDone: boolean;
  description: string;
  deleted: (id: string) => void;
  completed: (state: boolean, id: string) => boolean;
}

export function Assignment({
  id,
  isDone,
  description,
  deleted,
  completed,
}: props) {
  const [isChecked, setIsChecked] = useState(isDone);

  function handleDeleteAssign() {
    deleted(id);
  }

  function handleCompletedAssign() {
    setIsChecked(completed(isChecked, id));
  }

  return (
    <div className={styles.assign}>
      <label className={styles.containerCheckbox}>
        {" "}
        <p className={isChecked ? styles.assignChecked : ""}>{description}</p>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCompletedAssign}
        />
        <span className={styles.checkmark}></span>
      </label>
      <div className={styles.ContainerTrash}>
        <button onClick={handleDeleteAssign}>
          <Trash />
        </button>
      </div>
    </div>
  );
}
