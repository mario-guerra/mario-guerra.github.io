"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiX } from "react-icons/si";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const [randomJoke, setRandomJoke] = useState("");

  // Update the joke client-side only after component mounts
  useEffect(() => {
    // Array of tech dad jokes
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
      "Why did the programmer get a job at the bakery? Because he was good at handling cookies.",
      "Why did the computer go to the therapist? It had too many unresolved dependencies.",
      "Why did the user call tech support? Because he couldn't find the 'any' key.",
      "There are 10 types of people in the world: those who understand binary and those who don't.",
      "How do you make a programmer's heart race? Say, 'Your code compiled with no warnings.'",
      "What's a programmer's favorite hangout place? Foo Bar.",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "Why did the PowerPoint presentation cross the road? To get to the other slide.",
      "Why are Assembly programmers always soaking wet? They work below C-level.",
      "What do you call eight hobbits? A hobbyte.",
      "What's a computer's favorite pickup line? 'Are you a Wi-Fi hotspot? Because I'm feeling a connection.'",
      "How do you know a programmer is an extrovert? They look at *your* shoes when they talk to you.",
      "Why did the PowerPoint presentation cross the road? To get to the other slide.",
      "Why did the quantum computer break up with the classical computer? It was too predictable.",
      "What do you call a programmer who doesn't comment their code? A mystery writer.",
      "Why did the computer get a ticket? It had a bad driver.",
    ];
    
    const randomIndex = Math.floor(Math.random() * techDadJokes.length);
    setRandomJoke(techDadJokes[randomIndex]);
    setMounted(true);
  }, []);

  return (
    <footer className="w-full border-t border-border/40 bg-background py-8">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-x-10">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold">Mario Guerra</h2>
            <p className="text-sm text-foreground/80">
              Developer experience specialist & AI tool developer creating innovative ways to make software development more intuitive and efficient.
            </p>
          </div>

          <div className="flex flex-col space-y-4 md:items-center">
            <h2 className="text-lg font-semibold">Links</h2>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-foreground/80 hover:text-primary">
                Home
              </Link>
              <Link href="/projects" className="text-sm text-foreground/80 hover:text-primary">
                Projects
              </Link>
              <Link href="/resume" className="text-sm text-foreground/80 hover:text-primary">
                Resume
              </Link>
              <Link href="/blog" className="text-sm text-foreground/80 hover:text-primary">
                Blog
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:items-center">
            <h2 className="text-lg font-semibold">TechHumor.exe</h2>
            <p className="text-sm text-foreground/80 md:text-center">
              {mounted ? randomJoke : "Loading joke..."}
            </p>
          </div>

          <div className="flex flex-col space-y-4 md:items-center">
            <h2 className="text-lg font-semibold">Connect</h2>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mario-guerra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary"
                aria-label="GitHub"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/mario-guerra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/_marioguerra_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary"
                aria-label="X (formerly Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="/portfolio-website/contact"
                className="text-foreground/80 hover:text-primary"
                aria-label="Email"
              >
                <FiMail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-foreground/60">
          <p>© {currentYear} Mario Guerra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
