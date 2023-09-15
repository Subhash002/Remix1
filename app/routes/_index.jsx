import { Link } from "@remix-run/react";
import styles from "../styles/home.css";
export const meta = () => {
  return [
    { title: "Notes App" },
    { name: "description", content: "Welcome to Noter!" },
  ];
};

export default function Index() {
  return (
    <main id="content">
      <h1>Tracking notes cant be more easy with encryted and saved storage</h1>
      <p>Try out now our BETA release!</p>
      <p id="cta">
        <Link to={"/notes"}>Try Now!</Link>
      </p>
    </main>
  );
}

export const links = () => [{ rel: "stylesheet", href: styles }];
