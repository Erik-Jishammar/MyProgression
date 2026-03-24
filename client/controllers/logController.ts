import { BASE_URL } from "../services/api.js";
import type { Exercise, Session } from "../../shared/types.js";
import { addSession, getSessions } from "../services/api.js";

export function initLogController(
  sessionForm: HTMLFormElement,
  exerciseForm: HTMLFormElement,
  logList: HTMLElement | null
) {
  let logData: Session[] = [];
  let currentEditId: string | null = null;
  let currentSession: Session | null = null;

  // Disable inputs initially
  exerciseForm
    .querySelectorAll("input, button")
    .forEach(
      (el) => ((el as HTMLInputElement | HTMLButtonElement).disabled = true)
    );

  fetchSessions();

  // Start new session
  sessionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    currentSession = {
      _id: Date.now().toString(),
      split: (sessionForm.elements.namedItem("split") as HTMLInputElement)
        .value,
      date: (sessionForm.elements.namedItem("date") as HTMLInputElement).value,
      exercises: [],
    };

    sessionForm.reset();
    exerciseForm
      .querySelectorAll("input, button")
      .forEach(
        (el) => ((el as HTMLInputElement | HTMLButtonElement).disabled = false)
      );
    renderCurrentExercises();
  });

  // Add exercise
  exerciseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!currentSession) return;

    const newExercise: Exercise = {
      _id: Date.now().toString(),
      name: (exerciseForm.elements.namedItem("name") as HTMLInputElement).value,
      sets: Number((exerciseForm.elements.namedItem("sets") as HTMLInputElement).value),
      reps: Number((exerciseForm.elements.namedItem("reps") as HTMLInputElement).value),
      weight: Number((exerciseForm.elements.namedItem("weight") as HTMLInputElement).value),
      comment: (exerciseForm.elements.namedItem("comment") as HTMLInputElement).value,
    };

    if (currentEditId) {
      currentSession.exercises = currentSession.exercises.map((ex) =>
        ex._id === currentEditId ? { ...ex, ...newExercise } : ex
      );
      currentEditId = null;
    } else {
      currentSession.exercises.push(newExercise);
    }

    renderCurrentExercises();
    exerciseForm.reset();
  });

  // Save session
  const saveBtn = document.getElementById("save-btn") as HTMLButtonElement;
  saveBtn.addEventListener("click", async () => {
    if (!currentSession || currentSession.exercises.length === 0) {
      alert("No exercises to save! Add at least one exercise first.");
      return;
    }

    try {
      const data = await addSession(currentSession);

      // Clear the log list
      if (logList) logList.innerHTML = "";

      currentSession = null;
      renderCurrentExercises();

      sessionForm.reset();
      exerciseForm.reset();
      exerciseForm
        .querySelectorAll("input, button")
        .forEach(
          (el) => ((el as HTMLInputElement | HTMLButtonElement).disabled = true)
        );

      alert("Session saved!");
    } catch (error) {
      console.error("Could not save session:", error);
    }
  });

  // Fetch sessions
  async function fetchSessions(): Promise<void> {
    try {
      logData = await getSessions();
    } catch (error) {
      console.error("Could not fetch exercises:", error);
    }
  }

  // Render current exercises in the left card
  function renderCurrentExercises(): void {
    const sessionInfoDiv = document.getElementById("current-session-info");
    const ul = document.getElementById("current-exercises-list");
    if (!ul) return;
    ul.innerHTML = "";

    if (!currentSession) {
      if (sessionInfoDiv) sessionInfoDiv.textContent = "";
      return;
    }

    if (sessionInfoDiv)
      sessionInfoDiv.textContent = `${currentSession.split} - ${currentSession.date}`;

    currentSession.exercises.forEach((exercise) => {
      const li = document.createElement("li");
      li.textContent = `${exercise.name} (${exercise.sets}x${
        exercise.reps
      }) - ${exercise.weight}kg${
        exercise.comment ? ": " + exercise.comment : ""
      }`;

      const actions = document.createElement("div");
      actions.classList.add("log-actions");

      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
      editBtn.addEventListener("click", () => {
        currentEditId = exercise._id || null;
        (
          exerciseForm.elements.namedItem("name") as HTMLInputElement
        ).value = exercise.name;
        (exerciseForm.elements.namedItem("sets") as HTMLInputElement).value =
          String(exercise.sets);
        (exerciseForm.elements.namedItem("reps") as HTMLInputElement).value =
          String(exercise.reps);
        (exerciseForm.elements.namedItem("weight") as HTMLInputElement).value =
          String(exercise.weight);
        (exerciseForm.elements.namedItem("comment") as HTMLInputElement).value =
          exercise.comment || "";
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteBtn.addEventListener("click", () => {
        if (currentSession) {
          currentSession.exercises = currentSession.exercises.filter(
            (ex) => ex._id !== exercise._id
          );
          renderCurrentExercises();
        }
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      li.appendChild(actions);
      ul.appendChild(li);
    });
  }
}
