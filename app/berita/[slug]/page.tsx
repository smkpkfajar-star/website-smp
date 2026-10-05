import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/UI";
import { getBerita, getBeritaBySlug } from "@/data/berita";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const semua = await getBerita().catch(() => []);
  return semua.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const b = await getBeritaBySlug(slug).catch(() => null);
  if (!b) return { title: "Berita tidak ditemukan" };
  return { title: b.judul, description: b.ringkasan };
}

export default async function DetailBerita({ params }: Props) {
  const { slug } = await params;
  const b = await getBeritaBySlug(slug).catch(() => null);
  if (!b) notFound();

  return (
    <>
      <PageHero title={b.judul} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center gap-3 text-sm text-ink-soft">
          <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-700">
            {b.kategori}
          </span>
          <time dateTime={b.tanggal}>{b.tanggalLabel}</time>
        </div>

        {b.isVideo && b.videoUrl ? (
          <video
            src={b.videoUrl}
            poster={b.gambar}
            controls
            playsInline
            className="mb-8 w-full rounded-2xl"
          />
        ) : (
          b.gambar && (
            <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-2xl bg-primary-50">
              <Image
                src={b.gambar}
                alt={b.alt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 768px, 100vw"
              />
            </div>
          )
        )}

        <p className="whitespace-pre-line leading-relaxed text-ink">{b.caption}</p>

        {b.hashtags.length > 0 && (
          <p className="mt-6 text-sm text-primary-600">
            {b.hashtags.map((h) => `#${h}`).join(" ")}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/#berita" className="font-semibold text-primary-600 hover:text-accent-600">
            ← Kembali ke Berita
          </Link>
          {b.sumber && (
            <a
              href={b.sumber}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-600 hover:text-accent-600"
            >
              Lihat di Instagram ↗
            </a>
          )}
        </div>
      </article>
    </>
  );
}