import { useLocation } from "react-router-dom";

import style from "./index.module.scss";
import { ViewTypeList } from "../../types";
import { Modal } from "../../component/Modal";
import { useLoadFireBase } from "../../effect";
import { Header } from "../../features/Header";
import { TaskBoardContainer } from "../../features/TaskBoardContainer";
import { TaskCard } from "../../component/TaskCard";

export const TaskBoard = ({ viewType }: { viewType: ViewTypeList }) => {
  const { pathname } = useLocation();

  const pathArray = pathname.split("/");
  const currId = pathArray.at(-1);

  //TODO: прокинуть явно пропс!
  const modalOpen = viewType === "task";
  const currViewType = viewType || "taskBoard";

  // console.log("currTaskId,", id);

  // console.log("modalOpen", modalOpen, pathname);

  useLoadFireBase({ viewType: viewType, id: currId });

  return (
    <div className={style.container}>
      <Modal isOpen={Boolean(modalOpen)}>
        <TaskCard />
      </Modal>
      <Header type="task" />
      <TaskBoardContainer />
    </div>
  );
};
