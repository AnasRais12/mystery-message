"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  interface Jokes {
    title: string;
  }

  const [jokes, setJokes] = useState<Jokes[]>([]);

  useEffect(() => {
    axios
      .get<Jokes[]>("/api/api/jokes") // Corrected the route to match the proxy
      .then((response) => {
        console.log(response)
        setJokes(response.data); // Response se jokes set karo
      })
      .catch((error) => {
        console.error("Error fetching jokes:", error); // Error handle karo
      });
  }, []);

  return (
    <div>
      <h1>Jokes</h1>
      <ul>
        {jokes.map((joke, index) => (
          <li key={index}>{joke.title}</li> // Jokes ko list mein dikhana
        ))}
      </ul>
    </div>
  );
};

export default Page;
