import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { JOURNAL_ARTICLES } from '../data/journal';
import { JournalCategory } from '../types';
import { EditorialImage } from '../components/EditorialImage';

const CATEGORIES: ('All' | JournalCategory)[] = [
  'All',
  'Fashion',
  'Design',
  'Materials',
  'Craftsmanship',
  'Culture',
  'Lifestyle',
];

export const JournalPage: React.FC = () => {
  const { selectedArticleId, navigate } = useStore();
  const [categoryFilter, setCategoryFilter] = useState<'All' | JournalCategory>('All');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(selectedArticleId);

  React.useEffect(() => {
    setActiveArticleId(selectedArticleId);
  }, [selectedArticleId]);

  const activeArticle = activeArticleId
    ? JOURNAL_ARTICLES.find((a) => a.id === activeArticleId) ?? null
    : null;

  const filteredArticles =
    categoryFilter === 'All'
      ? JOURNAL_ARTICLES
      : JOURNAL_ARTICLES.filter((a) => a.category === categoryFilter);

  if (activeArticle) {
    const related = JOURNAL_ARTICLES.filter((a) => a.id !== activeArticle.id).slice(0, 2);

    return (
      <article className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 sm:px-8 lg:px-12">
        <div className="border-b border-[#1A1A1A]/10 pb-6">
          <button
            type="button"
            onClick={() => {
              setActiveArticleId(null);
              navigate('journal');
            }}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#6B6863] hover:text-[#1A1A1A]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            <span>All Journal Essays</span>
          </button>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-[12px] text-[#6B6863]">
            <span>{activeArticle.category}</span>
            <span>·</span>
            <span>{activeArticle.date}</span>
            <span>·</span>
            <span>{activeArticle.readTime}</span>
          </div>
          <h1 className="font-editorial mt-3 max-w-4xl text-4xl font-normal text-balance text-[#1A1A1A] sm:text-6xl">
            {activeArticle.title}
          </h1>
          <p className="mt-4 text-[14px] text-[#6B6863]">By {activeArticle.author}</p>
        </div>

        <div className="mt-10 aspect-[16/9] w-full overflow-hidden bg-[#EAE6DE]">
          <EditorialImage
            src={activeArticle.heroImage}
            alt={activeArticle.heroAlt}
            priority
            className="h-full w-full"
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-8">
          <blockquote className="font-editorial border-y border-[#1A1A1A]/15 py-6 text-2xl leading-snug italic text-[#1A1A1A] sm:text-3xl">
            “{activeArticle.pullQuote}”
          </blockquote>

          {activeArticle.paragraphs.map((para, i) => (
            <p key={i} className="text-[16px] leading-[1.75] text-[#1A1A1A]/85">
              {para}
            </p>
          ))}

          <div className="pt-4">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE6DE]">
              <EditorialImage
                src={activeArticle.secondaryImage}
                alt={activeArticle.secondaryAlt}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        <section className="mt-20 border-t border-[#1A1A1A]/10 pt-12">
          <h2 className="font-editorial text-3xl text-[#1A1A1A]">Continue Reading</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {related.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveArticleId(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col text-left"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#EAE6DE]">
                  <EditorialImage
                    src={item.heroImage}
                    alt={item.heroAlt}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-[12px] text-[#6B6863]">
                  <span>{item.category}</span>
                  <span>·</span>
                  <span>{item.readTime}</span>
                </div>
                <h3 className="font-editorial mt-1 text-2xl text-[#1A1A1A] group-hover:underline">
                  {item.title}
                </h3>
              </button>
            ))}
          </div>
        </section>
      </article>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-28 pb-24 sm:px-8 lg:px-12">
      <div className="border-b border-[#1A1A1A]/10 pb-8">
        <p className="text-[12px] tracking-[0.14em] text-[#6B6863] uppercase">
          ATELIER NOIR · Editorial Monograph
        </p>
        <h1 className="font-editorial mt-2 text-4xl font-normal text-[#1A1A1A] sm:text-6xl">
          The Journal
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-[#6B6863]">
          Notes on garment architecture, natural textiles, mineral colour, and daily rituals.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const active = categoryFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                active
                  ? 'bg-[#1A1A1A] text-[#F7F5F0]'
                  : 'border border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-[#1A1A1A]/50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Article Grid */}
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article, idx) => (
          <article key={article.id} className={idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}>
            <button
              type="button"
              onClick={() => {
                setActiveArticleId(article.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex h-full w-full flex-col text-left"
            >
              <div
                className={`w-full overflow-hidden bg-[#EAE6DE] ${
                  idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <EditorialImage
                  src={article.heroImage}
                  alt={article.heroAlt}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-[12px] text-[#6B6863]">
                <span>{article.category}</span>
                <span>·</span>
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="font-editorial mt-1.5 text-2xl font-normal text-[#1A1A1A] group-hover:underline sm:text-3xl">
                {article.title}
              </h2>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#6B6863]">
                {article.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1A1A1A]">
                <span>Read Essay</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};
