import { PageLayout } from "../templates/PageLayout.jsx";

export function AboutPage() {
  return (
    <PageLayout activePath="/about" className="about-shell">
      <main className="about-page">
        <h2>About me</h2>

        <p>
          My name is Aadi. I am currently pursuing a bachelor&apos;s degree in
          Computer Science, and I spend a lot of my time working on software
          projects that sit at the border of robotics, AI, and engineering.
        </p>

        <p>
          I am especially interested in robotics, machine learning, embedded
          systems, autonomous systems, computer vision, human-robot interaction,
          and the engineering decisions behind intelligent machines. I enjoy
          learning how software connects with hardware, sensors, control
          systems, and real-world physical problems.
        </p>

        <p>
          I build apps and tools for the web, but I&apos;m more driven by
          systems and research-driven ideas than by trend chasing. A lot of my
          interest comes from understanding how software can be useful in
          practical, technical domains where performance, reliability, and
          implementation details matter.
        </p>

        <p>
          Outside of code, I am a big gamer, a film enthusiast, and a music
          lover. I play piano and am working towards my ARSM diploma. Minecraft,
          Ghost of Tsushima, and Jedi: Fallen Order are some of my favourites,
          and I love anime, especially when it leans into deep world-building or
          strong emotional storytelling.
        </p>

        <p>
          Christopher Nolan is a huge favourite of mine, especially
          Interstellar, Inception, Tenet, Oppenheimer, and Dunkirk. I love that
          mix of ideas, scale, and technical craft, and it is one of the reasons
          I am drawn to engineering-heavy, concept-rich work.
        </p>

        <p>
          This blog is a place for technically interesting writing — robotics,
          AI, ML, embedded systems, research, and the kinds of engineering ideas
          I find worth thinking about.
        </p>
      </main>
    </PageLayout>
  );
}
