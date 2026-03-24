import { BASE_URL } from "../services/api.js";
import type { Session } from "../../shared/types.js";
import { getSessions, deleteSession } from "../services/api.js";

export function initHistoryController(container: HTMLElement) {
  // Fetch all sessions
  async function fetchSessions(): Promise<Session[]> {
    try {
      return await getSessions();
    } catch (error) {
      console.error("Error fetching sessions", error);
      return [];
    }
  }

  // Delete session
  async function deleteSession(id: string): Promise<void> {
    if (!confirm("Are you sure you want to delete this session?")) return;

    try {
      return await deleteSession(id);
      
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  }

  // Render all sessions
  async function renderSessions(): Promise<void> {
    const sessions = await fetchSessions();
    container.innerHTML = "";

    if (sessions.length === 0) {
      container.textContent = "No saved sessions yet";
      return;
    }

    sessions.reverse().forEach((session) => {
      const historyCard = document.createElement("div");
      historyCard.classList.add("history-card");

      const header = document.createElement("div");
      header.classList.add("history-header");

      const title = document.createElement("h3");
      title.textContent = `${session.split} - ${session.date}`;

      const deleteSessionButton = document.createElement("button");
      deleteSessionButton.classList.add("delete-session-btn");
      deleteSessionButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteSessionButton.addEventListener("click", () => {
        if (session._id) deleteSession(session._id);
      });

      header.appendChild(title);
      header.appendChild(deleteSessionButton);
      historyCard.appendChild(header);

      const ul = document.createElement("ul");
      session.exercises.forEach((exercise) => {
        const li = document.createElement("li");
        li.textContent = `${exercise.name} (${exercise.sets}x${
          exercise.reps
        }) - ${exercise.weight}kg${
          exercise.comment ? ": " + exercise.comment : ""
        }`;
        ul.appendChild(li);
      });
      historyCard.appendChild(ul);

      container.appendChild(historyCard);
    });
  }
  renderSessions();
}
