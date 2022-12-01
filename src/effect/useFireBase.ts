import { useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  /*   doc,
  updateDoc,
  deleteDoc,
  orderBy,
  Timestamp,
  getFirestore,
  DocumentData, */
} from "firebase/firestore";

import { db, path } from "../firebase";
import { useAppDispatch } from "../business/reducer";
import { useSelector } from "react-redux";
import { NewProjectType, ProjectId, State, StateDataType } from "../types";

/**
 * hook for interaction with firebase
 */

export type LoadedValueType = { projectData: NewProjectType };
export type ProjectListType = Array<LoadedDataType>;

export type LoadedDataType = { id: ProjectId; value: LoadedValueType };

export function useFireBase() {
  const dispatch = useAppDispatch();
  const [doEffect] = useSelector((state: State) => [state.doEffect]);

  useEffect(() => {
    switch (doEffect?.type) {
      // automatically pull data when bd update
      case "!loadFireBase": {
        const currQuery = query(collection(db, path));

        const docRef = doc(
          db,
          path,
          "CYy2z07e6doZJTKq8Jdi",
          "list",
          "mgEdBgFQQNbvEP7xkcCG"
        );
        getDoc(docRef).then((res) => console.log("res", res.data()));

        onSnapshot(currQuery, (querySnapshot) => {
          const projectList = querySnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                value: doc.data(),
              } as LoadedDataType)
          );

          /*   console.log("projectList", projectList);
          const stateDataObject = getStateObject(projectList); */

          dispatch({ type: "loadedData", payload: projectList });
        });

        break;
      }

      case "!saveProject": {
        // const data = doEffect.data;

        const testData = "testData";
        addDoc(collection(db, path, "CYy2z07e6doZJTKq8Jdi", "list"), {
          testData,
        })
          .then(() => {
            dispatch({ type: "endedSaveProject" });
          })
          .catch(() => console.error("error"));

        break;
      }

      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doEffect]);
}
