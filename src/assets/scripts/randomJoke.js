const techDadJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why do Java developers wear glasses? Because they can't C#!",
  "How do you comfort a JavaScript bug? You console it.",
  "Why was the computer cold? It left its Windows open.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Why do programmers hate nature? It has too many bugs.",
  "Why did the computer keep freezing? It left its Windows open.",
  "Why was the cell phone wearing glasses? It lost its contacts.",
  "Why did the programmer quit his job? He didn't get arrays.",
  "Why was the computer tired when it got home? It had a hard drive.",
  "Why do programmers prefer keyboards over mice? Because they don't like pointers.",
  "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.",
  "Why did the programmer get stuck in the shower? The instructions on the shampoo bottle said: Lather, Rinse, Repeat.",
  "Why did the computer cross the road? To get to the other site.",
  "Why did the database administrator break up with the table? It had too many relationships.",
  "Why did the computer get promoted? It had a lot of drive.",
  "Why did the programmer go to the gym? To work on their core.",
  "Why did the programmer go to the bakery? To get some cookies.",
  "Why did the programmer go to the hardware store? To get some tools for debugging.",
  "There are only 10 kinds of people in the world - those that understand binary and those that don't.",
  "Why did the programmer get a job at the bakery? Because he was good at handling cookies.",
  "Why did the computer go to the therapist? It had too many unresolved dependencies.",
  "Why did the user call tech support? Because he couldn’t find the 'any' key.",
];

function displayRandomJoke() {
  const jokeElement = document.getElementById("tech-dad-joke");
  if (jokeElement) {
    const randomIndex = Math.floor(Math.random() * techDadJokes.length);
    jokeElement.textContent = techDadJokes[randomIndex];
  }
}

document.addEventListener("DOMContentLoaded", displayRandomJoke);
