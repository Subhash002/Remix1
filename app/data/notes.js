import fs from "fs";

export function getStoredNotes() {
  try {
    const rawFileContents = fs.readFileSync("notes.json", "utf8");
    const data = JSON.parse(rawFileContents);
    const storedNotes = data.notes ?? [];
    return storedNotes;
  } catch (error) {
    console.error("Error reading file or parsing JSON:", error);
    return [];
  }
}

export function storeNotes(notes) {
  try {
    fs.writeFileSync("notes.json", JSON.stringify({ notes: notes || [] }));
    console.log("Notes stored successfully.");
  } catch (error) {
    console.error("Error writing file:", error);
  }
}
