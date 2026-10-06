import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  GitMerge,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="pb-16">
      <section className="relative flex min-h-[64vh] items-center overflow-hidden bg-[#1c3028] text-white">
        <div
          aria-hidden="true"
          className="home-hero-image absolute inset-0 bg-cover bg-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[#14211c]/65" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase text-white/85">
              <span className="h-2 w-2 rounded-full bg-[#e19a63]" />
              <span>Côte d'Ivoire · Ressources organiques · Énergie</span>
            </div>
            <h1 className="text-4xl font-bold leading-none sm:text-6xl">
              BIOWATT-CI
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-medium leading-snug sm:text-3xl">
              Du déchet au watt, de la donnée à la décision.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              La plateforme nationale pour cartographier les gisements
              organiques, qualifier leur potentiel et éclairer les décisions de
              valorisation biogaz.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/feedstocks"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-5 font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
              >
                <MapPin aria-hidden="true" className="h-5 w-5" />
                Explorer les gisements
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/60 px-5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Accès professionnel{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="value-chain-title"
      >
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase text-[var(--primary)]">
            Du terrain à la décision
          </p>
          <h2
            id="value-chain-title"
            className="mt-2 text-2xl font-bold text-[var(--foreground)] sm:text-3xl"
          >
            Une chaîne de valorisation lisible
          </h2>
        </div>
        <ol className="grid gap-0 md:grid-cols-5">
          {[
            {
              title: "Gisements",
              text: "Recenser les matières organiques.",
              Icon: MapPin,
            },
            {
              title: "Potentiel",
              text: "Qualifier les volumes mobilisables.",
              Icon: Zap,
            },
            {
              title: "Unités",
              text: "Connaître les capacités et besoins.",
              Icon: Flame,
            },
            {
              title: "Matching",
              text: "Repérer les compatibilités à vérifier.",
              Icon: GitMerge,
            },
            {
              title: "Décision",
              text: "Orienter les choix territoriaux.",
              Icon: ClipboardCheck,
            },
          ].map(({ title, text, Icon }, index) => (
            <li
              key={title}
              className="relative border-l border-[var(--border)] py-3 pl-5 md:border-l-0 md:border-t md:py-5 md:pl-0 md:pr-4"
            >
              <span className="absolute -left-[5px] top-4 h-2.5 w-2.5 rounded-full bg-[var(--primary)] md:-top-[5px] md:left-0" />
              <p className="text-xs font-semibold text-[var(--muted)]">
                0{index + 1}
              </p>
              <h3 className="mt-2 flex items-center gap-2 text-base font-bold text-[var(--foreground)]">
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 text-[var(--primary)]"
                />{" "}
                {title}
              </h3>
              <p className="mt-2 max-w-48 text-sm leading-relaxed text-[var(--muted)]">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="border-y bg-[var(--surface)]"
        aria-labelledby="quality-title"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-[var(--primary)]">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" /> Traçabilité
              des données
            </p>
            <h2
              id="quality-title"
              className="mt-3 text-2xl font-bold text-[var(--foreground)]"
            >
              La qualité reste visible à chaque étape.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Une donnée déclarée ou de démonstration n'est jamais présentée
              comme une mesure réelle.
            </p>
          </div>
          <ul
            className="grid gap-x-6 gap-y-4 sm:grid-cols-2"
            aria-label="Niveaux de qualité des données"
          >
            {[
              ["DEMONSTRATION", "Donnée fictive de démonstration"],
              ["DECLARE", "Déclarée par l’exploitant"],
              ["DOCUMENTARY_VERIFIED", "Vérifiée sur pièces"],
              ["SITE_VERIFIED", "Vérifiée sur site"],
              ["MEASURED", "Mesurée sur site instrumenté"],
            ].map(([status, description]) => (
              <li key={status} className="flex items-start gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]"
                />
                <span>
                  <span className="block text-xs font-bold text-[var(--foreground)]">
                    {status}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--muted)]">
                    {description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
