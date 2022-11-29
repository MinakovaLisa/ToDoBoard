import { ProjectBoardContainer } from "../../features/ProjectBoardContainer";
import { Header } from "../../features/Header";

import style from "./index.module.scss";

export const ProjectBoard = () => {
  //Подобие header +логотип на индекс
  //кнопка создать проект
  // выбрать проект

  return (
    <div className={style.container}>
      <Header />
      <ProjectBoardContainer />
    </div>
  );
};
