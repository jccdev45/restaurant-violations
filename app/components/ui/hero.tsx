import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { HeroImage } from "@/types/hero-image";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Img } from "react-image";

type HeroProps = {
  type: "image" | "video";
  images: HeroImage[];
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  subtext?: string;
  autoPlay?: boolean;
};

export function Hero({
  type = "image",
  images,
  title,
  subtitle,
  subtext,
  ctaText,
  ctaLink,
  autoPlay = true,
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!autoPlay) return;

    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [autoPlay]);

  return (
    <section className="relative h-[400px] overflow-hidden md:rounded-lg">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-700 ease-in-out",
            index === currentIndex
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          )}
        >
          {image.type === "video" ? (
            <video
              muted
              playsInline
              autoPlay
              loop
              preload="metadata"
              disablePictureInPicture
              className="size-full object-cover object-center"
            >
              <source src={image.src} type="video/mp4" />
            </video>
          ) : (
            <Img
              src={image.src}
              alt={image.alt || ""}
              decoding="async"
              loading="eager"
              className="size-full object-cover object-bottom"
            />
          )}
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="space-y-2 text-center dark:text-foreground text-background bg-background/10 dark:bg-foreground/10 p-2 rounded-lg w-full max-w-md lg:max-w-xl text-balance z-10 backdrop-blur-xs">
          <Typography variant="h1" className="tracking-wide">
            {title}
          </Typography>
          <Typography
            variant="lead"
            className="text-background dark:text-foreground"
          >
            {subtitle}
          </Typography>
          <div className="mt-6">
            <Button variant="secondary" size="lg" asChild>
              <Link to={ctaLink}>
                {ctaText}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
