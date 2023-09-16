import NewNote from "../components/NewNote";

import newNoteStyles from "~/components/NewNote/index.css";
import NoteListStyles from "~/components/NoteList/index.css";
import { getStoredNotes, storeNotes } from "../data/notes";
import { redirect, json } from "@remix-run/node";
import NoteList from "../components/NoteList";
import { useLoaderData } from "react-router";
import { Link, useCatch } from "@remix-run/react";
export const meta = () => {
  return [
    { title: "My Notes" },
    { name: "description", content: "Check your notes or add new note" },
  ];
};
export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "No notes found" },
      { status: 404, statusText: "No Found" }
    );
  }
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add validation...
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title enter more than 5 characters" };
  }
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  //await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  return redirect("/notes");
}

export function links() {
  return [
    { rel: "stylesheet", href: newNoteStyles },
    { rel: "stylesheet", href: NoteListStyles },
  ];
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  const message = caughtResponse.data?.message || "Data not found";
  return (
    <main>
      <p>{message}</p>
    </main>
  );
}

export function ErrorBoundary(error) {
  <main className="error">
    <h1>An error occoured with your notes</h1>
    <p>{error.message}</p>
    <p>
      Back to <Link to={"/"}>Safty</Link>
    </p>
  </main>;
}
