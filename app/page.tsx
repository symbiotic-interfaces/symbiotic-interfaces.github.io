import Image from "next/image";
import newsData from "@/content/news.json";
import peopleData from "@/content/people.json";
import researchData from "@/content/research.json";
import { HeaderCarousel } from "./header-carousel";

type ResearchItem = {
  year: number;
  title: string;
  authors: string;
  venue: string;
  topic: string;
  description: string;
  award?: string;
  image: string;
  alt: string;
  url: string;
};

type Person = {
  name: string;
  title: string;
  image: string;
  alt: string;
  website: string;
  placeholderTone?: string;
};

type NewsItem = {
  date: string;
  title: string;
  note: string;
  url: string;
};

const research = researchData as ResearchItem[];
const people = peopleData as Person[];
const news = newsData as NewsItem[];
const researchByYear = Array.from(
  research.reduce((groups, project) => {
    const projects = groups.get(project.year) ?? [];
    projects.push(project);
    groups.set(project.year, projects);
    return groups;
  }, new Map<number, ResearchItem[]>()),
).sort(([yearA], [yearB]) => yearB - yearA);

function Arrow() {
  return <span className="arrow-icon" aria-hidden="true" />;
}

function Publication({ project }: { project: ResearchItem }) {
  return (
    <article className="publication">
      <a
        className="publication-image"
        href={project.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open publication: ${project.title}`}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 720px) 100vw, 38vw"
        />
      </a>
      <div className="publication-copy">
        <div className="publication-meta">
          <span>{project.venue}</span>
          <span>{project.topic}</span>
        </div>
        <h4>
          <a href={project.url} target="_blank" rel="noreferrer">
            {project.title} <Arrow />
          </a>
        </h4>
        <p className="publication-authors">{project.authors}.</p>
        <p className="publication-description">{project.description}</p>
        {project.award && (
          <p className="publication-award">{project.award}</p>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Symbiotic Interfaces Lab home">
          <Image
            src="/images/symbiotic-interfaces-lab-logo-wide-transparent.png"
            alt="Symbiotic Interfaces Lab"
            width={4000}
            height={717}
            priority
          />
        </a>
        <nav aria-label="Main navigation">
          <a href="#research">Research</a>
          <a href="#team">Team</a>
          <a href="#news">News</a>
        </nav>
        <a
          className="apply-link"
          href="https://forms.gle/WMbb7NYts1fX5BYG7"
          target="_blank"
          rel="noreferrer"
        >
          Apply to the lab <Arrow />
        </a>
      </header>

      <section className="overview">
        <div className="overview-copy">
          <h1>
            Building a symbiotic loop between computing interfaces and human
            abilities
          </h1>
          <p className="overview-lede">
            Computing is becoming increasingly generative and personal, yet
            most systems still communicate through pixels. The human nervous
            system offers a more direct and expressive design space for
            interaction.
          </p>
          <p>
            We are an interdisciplinary <strong>human–computer interaction
            (HCI)</strong> research group based in <strong>the Department of
            Computer Science at UT Austin</strong>. We build computing
            interfaces that form a symbiotic loop with people by closely
            coupling technology with the human neural processes underlying
            sensation, perception, cognition, and action. These interfaces
            include dexterous tactile feedback without obstructing the palm{" "}
            <a
              className="overview-video-link"
              href="https://youtu.be/q6G8Htzq_gQ"
              target="_blank"
              rel="noreferrer"
              aria-label="Watch video: Full-Hand Electro-Tactile Feedback"
            >
              (video)
            </a>
            ; faster voluntary actions through muscle sensing and stimulation{" "}
            <a
              className="overview-video-link"
              href="https://youtu.be/M0EVjipRmPU"
              target="_blank"
              rel="noreferrer"
              aria-label="Watch video: Myo Action"
            >
              (video)
            </a>
            ; and full-body sensory feedback through non-invasive brain
            stimulation{" "}
            <a
              className="overview-video-link"
              href="https://www.youtube.com/watch?v=-Y61l38F81s"
              target="_blank"
              rel="noreferrer"
              aria-label="Watch video: Haptic Source-Effector"
            >
              (video)
            </a>
            .
          </p>
          <p>
            We pursue this vision through electronic and mechanical systems
            design, signal processing, machine learning, interaction design,
            and psychophysical methods. Grounded in HCI, our research spans
            related areas including haptics, somatosensory neuroscience,
            cognitive science, and robotics.
          </p>
          <aside className="lab-opening">
            <p>
              The lab will open in the Department of Computer Science at The
              University of Texas at Austin in January 2027.
            </p>
          </aside>
        </div>

        <HeaderCarousel />
      </section>

      <section className="people" id="team">
        <div className="section-heading">
          <h2>Team</h2>
        </div>
        <div className="people-grid">
          {people.map((person) => (
            <article className="person" key={person.name}>
              {person.image ? (
                <div className="person-photo">
                  <Image
                    src={person.image}
                    alt={person.alt || person.name}
                    fill
                    sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
                  />
                </div>
              ) : (
                <div
                  className={`person-placeholder ${person.placeholderTone || "warm"}`}
                  role="img"
                  aria-label={`Placeholder for ${person.name}`}
                >
                  <span>Photo coming soon</span>
                </div>
              )}
              <div className="person-name">
                <div>
                  <h3>{person.name}</h3>
                  <p>{person.title}</p>
                </div>
                {person.website && (
                  <a
                    href={person.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${person.name}’s website`}
                  >
                    <Arrow />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="news" id="news">
        <div className="section-heading">
          <h2>News</h2>
        </div>
        <div className="news-list">
          {news.map((item) => (
            <article key={item.date + item.title}>
              <time dateTime={item.date.replace(".", "-")}>{item.date}</time>
              <h3>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.title} <Arrow />
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="research" id="research">
        <div className="section-heading">
          <h2>Research</h2>
        </div>

        <div className="research-years">
          {researchByYear.map(([year, projects]) => (
            <section
              className="research-year"
              key={year}
              aria-labelledby={`year-${year}`}
            >
              <h3 id={`year-${year}`}>{year}</h3>
              <div className="publication-list">
                {projects.map((project) => (
                  <Publication key={project.title} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="join">
        <div>
          <p>
            We are recruiting PhD students, postdoctoral researchers, and
            collaborators interested in interdisciplinary HCI that connects
            computing with human sensation, perception, cognition, and action.
          </p>
          <a
            href="https://forms.gle/WMbb7NYts1fX5BYG7"
            target="_blank"
            rel="noreferrer"
          >
            Submit the research interest form <Arrow />
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-identity">
          <Image
            src="/images/symbiotic-interfaces-lab-logo.png"
            alt="Symbiotic Interfaces Lab"
            width={278}
            height={118}
          />
        </div>
        <div className="footer-nav">
          <a href="#research">Research</a>
          <a href="#team">Team</a>
          <a href="#news">News</a>
        </div>
        <address className="footer-address">
          Gates-Dell Complex
          <br />
          2317 Speedway
          <br />
          Austin, TX 78712
          <br />
          United States
        </address>
        <div className="footer-base">
          <span>© 2026 Symbiotic Interfaces Lab</span>
          <span>The University of Texas at Austin</span>
          <a href="#top">Top ↑</a>
        </div>
      </footer>
    </main>
  );
}
