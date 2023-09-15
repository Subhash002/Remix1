import NewNote from "../components/NewNote";

import newNoteStyles from "~/components/NewNote/index.css";
import NoteListStyles from "~/components/NoteList/index.css";
import { getStoredNotes, storeNotes } from "../data/notes";
import { redirect } from "@remix-run/node";
import NoteList from "../components/NoteList";
import { useLoaderData } from "react-router";
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
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add validation...
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export function links() {
  return [
    { rel: "stylesheet", href: newNoteStyles },
    { rel: "stylesheet", href: NoteListStyles },
  ];
}
