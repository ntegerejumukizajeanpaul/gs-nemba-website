import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiMail, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import HeroSlider from "../components/HeroSlider";
import AnnouncementMarquee from "../components/AnnouncementMarquee";
import StatsGrid from "../components/StatsGrid";
import NewsCard from "../components/NewsCard";
import SectionCard from "../components/SectionCard";
import useSeo from "../hooks/useSeo";
import api from "../services/api";
import hero1 from "../assets/nemba1.png";
import hero2 from "../assets/nemba2.png";
import hero3 from "../assets/nemba3.png";
import {
  heroSlides,
  statistics,
  programs,
  testimonials,
  partners,
} from "../data/siteData";

function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useSeo({
    title: "Groupe Scolaire Nemba | Home",
    description:
      "Discover academics, timetable, school events and student life at Groupe Scolaire Nemba in Rwanda.",
  });

  useEffect(() => {
    // Normalise any API response shape into a plain array.
    // Handles: plain array, { items: [...], total: N }, { data: [...] },
    // null / undefined, or any other unexpected shape.
    function toArray(value) {
      if (value == null) return [];
      if (Array.isArray(value)) return value;
      if (Array.isArray(value.items)) return value.items;
      if (Array.isArray(value.data)) return value.data;
      return [];
    }

    async function load() {
      try {
        const [annResult, newsResult, galleryResult] = await Promise.allSettled([
          api.get("/announcements"),
          api.get("/news?limit=3"),
          api.get("/gallery"),
        ]);

        const annData =
          annResult.status === "fulfilled" ? annResult.value.data : null;
        const newsData =
          newsResult.status === "fulfilled" ? newsResult.value.data : null;
        const galleryData =
          galleryResult.status === "fulfilled" ? galleryResult.value.data : null;

        console.log("[Home] /announcements response:", annData);
        console.log("[Home] /news response:", newsData);
        console.log("[Home] /gallery response:", galleryData);

        setAnnouncements(toArray(annData));
        setLatestNews(toArray(newsData));
        setGalleryItems(toArray(galleryData));

        if (annResult.status === "rejected")
          console.error("[Home] /announcements failed:", annResult.reason);
        if (newsResult.status === "rejected")
          console.error("[Home] /news failed:", newsResult.reason);
        if (galleryResult.status === "rejected")
          console.error("[Home] /gallery failed:", galleryResult.reason);
      } catch (error) {
        console.error("[Home] Failed to load page data:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const homeAds = announcements.filter((item) => item.type === "home_ad");
  const announcementItems = announcements.filter(
    (item) => item.type !== "home_ad",
  );
  const heroItems = galleryItems.filter((item) => item.display_type === "hero");
  const homePreviewItems = galleryItems.filter(
    (item) => item.display_type === "home_preview",
  );

  const providedSlides = [
    {
      title: "Groupe Scolaire Nemba",
      subtitle: "Welcome to GS Nemba",
      description:
        "Explore the school through the photos you provided in the homepage slideshow.",
      image: hero1,
    },
    {
      title: "Active Learning",
      subtitle: "Students in action",
      description: "Our school community captured in memorable campus moments.",
      image: hero2,
    },
    {
      title: "Campus Life",
      subtitle: "School spirit",
      description: "A slideshow of your photos displayed on the homepage.",
      image: hero3,
    },
  ];

  const slidesToShow = heroItems.length
    ? heroItems.map((item, index) => ({
        title: item.title || `Featured photo ${index + 1}`,
        subtitle: item.category || "Hero photo",
        description: item.title
          ? `Displayed as a homepage slide`
          : "Homepage hero image",
        image: item.image,
      }))
    : providedSlides;

  return (
    <main>
      <HeroSlider slides={slidesToShow} />
      <AnnouncementMarquee announcements={announcementItems} />
      {homeAds.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {homeAds.map((ad) => (
              <article
                key={ad.id}
                className="rounded-3xl border border-primary/20 bg-primary/5 p-8 text-slate-900 shadow-soft dark:border-primary/30 dark:bg-slate-900/80 dark:text-white"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-primary">
                  Homepage ad
                </p>
                <h2 className="mt-4 text-2xl font-semibold">{ad.title}</h2>
                <p className="mt-4 text-slate-700 dark:text-slate-300">
                  {ad.summary}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section
        id="about"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Welcome to GS Nemba
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
              A modern school built around student success and community values.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              We deliver strong academic programs, a nurturing environment and a
              future-ready approach across primary, and secondary levels.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <SectionCard title="Safe Campus" icon="🏫">
                Secure classrooms and learning spaces with modern facilities.
              </SectionCard>
              <SectionCard title="Digital Learning" icon="💻">
                ICT-integrated curriculum prepares learners for the 21st
                century.
              </SectionCard>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="rounded-[2rem] bg-primary/5 p-7 text-slate-900 shadow-soft dark:bg-slate-900/80 dark:text-white">
              <h3 className="text-xl font-semibold">Outstanding achievement</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Our learners consistently score above district averages and
                thrive in national examinations.
              </p>
            </div>
            <div className="rounded-[2rem] bg-slate-50 p-7 text-slate-900 shadow-soft dark:bg-slate-900 dark:text-white">
              <h3 className="text-xl font-semibold">Community focused</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                We partner with parents, local leaders and organisations to
                nurture every child.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {programs.map((program) => (
            <SectionCard key={program.title} title={program.title} icon="🎓">
              {program.description}
            </SectionCard>
          ))}
        </div>
      </section>
      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
                Our mission
              </p>
              <h2 className="mt-4 text-4xl font-semibold">
                Every learner belongs, every learner succeeds.
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-slate-300">
                We prioritize meaningful instruction, values-based character
                building and a safe environment that fosters confidence and
                curiosity.
              </p>
            </div>
            <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Need the school schedule?
                </h3>
                <p className="mt-3 text-slate-300">
                  View the complete timetable for classes, extracurricular
                  sessions and daily routines.
                </p>
              </div>
              <Link
                to="/timetable"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                View Timetable <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Latest announcements
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Stay updated with the school calendar, events and community news.
            </p>
            <div className="mt-8 space-y-4">
              {loading ? (
                <div className="space-y-3">
                  <div className="h-16 rounded-3xl bg-slate-200 dark:bg-slate-800" />
                  <div className="h-16 rounded-3xl bg-slate-200 dark:bg-slate-800" />
                </div>
              ) : announcementItems.length ? (
                announcementItems.slice(0, 2).map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      {item.summary}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </article>
                ))
              ) : (
                <p className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  No announcements available at the moment.
                </p>
              )}
            </div>
          </div>
          <div className="rounded-[2rem] bg-primary/5 p-8 dark:bg-slate-900/80">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              School statistics
            </h3>
            <div className="mt-8 space-y-5">
              <StatsGrid items={statistics} />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_0.9fr] lg:items-center">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Principal message
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
              Building trusted pathways for every student.
            </h2>
            <p className="mt-6 text-slate-600 dark:text-slate-300">
              "At Groupe Scolaire Nemba, we invest in character, creativity and
              academic rigor so learners can thrive in the classroom and
              beyond."
            </p>
          </div>
        </div>
      </section>
      <section className="bg-slate-100 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                What families say
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Real experiences from parents, teachers and learners who have
                embraced our school community.
              </p>
            </div>
            <div className="grid gap-6">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft dark:border-slate-700 dark:bg-slate-900"
                >
                  <p className="text-slate-600 dark:text-slate-300">
                    "{item.quote}"
                  </p>
                  <p className="mt-5 font-semibold text-slate-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">
            Partners
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold">
            Ready to explore Groupe Scolaire Nemba?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-100">
            Apply now and become part of an educational community that champions
            growth, creativity and academic strength.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/timetable"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-slate-100"
            >
              View Timetable
            </Link>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact School
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
