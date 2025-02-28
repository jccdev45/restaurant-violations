import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { HeroImage } from "@/types/hero-image";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNextItem = useCallback(() => {
    setIsTransitioning(true);
    const nextIndex = (currentItemIndex + 1) % images.length;
    setCurrentItemIndex(nextIndex);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [currentItemIndex, images.length]);

  const handleVideoEnded = useCallback(() => {
    handleNextItem();
  }, [handleNextItem]);

  useEffect(() => {
    if (autoPlay) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        handleNextItem();
      }, 7000);
    }

    // Cleanup function: clear the timeout if the component unmounts or autoPlay changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoPlay, handleNextItem]);

  const renderMedia = () => {
    const currentImage = images[currentItemIndex];
    if (currentImage.type === "video") {
      return (
        <video
          key={currentItemIndex}
          muted
          playsInline
          autoPlay
          loop
          onEnded={handleVideoEnded}
          className="size-full object-cover object-center transition-opacity duration-1000"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          <source src={currentImage.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <Img
          key={currentItemIndex}
          src={currentImage.src}
          alt={currentImage.alt || ""}
          className={cn(
            "size-full object-cover object-bottom transition-opacity duration-1000",
            isTransitioning ? `opacity-0` : `opacity-100`
          )}
        />
      );
    }
  };

  return (
    <section className="relative h-[400px] overflow-hidden md:rounded-lg">
      {renderMedia()}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-30 dark:opacity-50"></div>
        <div className="space-y-4 text-center text-background dark:text-foreground w-full max-w-md lg:max-w-xl text-balance z-10">
          <Typography variant="h1">{title}</Typography>
          <Typography variant="h4">{subtitle}</Typography>
          {subtext && (
            <Typography
              variant="small"
              className="bg-destructive/20 p-2 rounded"
            >
              {subtext}
            </Typography>
          )}
          <div className="isolation-auto mt-6">
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
