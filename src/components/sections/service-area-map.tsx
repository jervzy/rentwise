"use client";

import Image from "next/image";
import { useState } from "react";
import { serviceAreaLocations } from "@/lib/homepage-content";

const MAP_BOUNDS = {
  west: -1.065,
  east: -0.875,
  north: 51.482,
  south: 51.414,
} as const;

type MapStatus = "fallback" | "loading" | "loaded";

function getFallbackPosition(latitude: number, longitude: number) {
  return {
    left: `${((longitude - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100}%`,
    top: `${((MAP_BOUNDS.north - latitude) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * 100}%`,
  };
}

function MapFallback() {
  return (
    <div
      className="map-fallback"
      role="img"
      aria-label="Map showing Rent Wise service areas across Reading and surrounding Berkshire locations."
    >
      <span className="map-fallback-label">Reading</span>
      {serviceAreaLocations.map((location) => (
        <span
          className="map-fallback-marker"
          style={getFallbackPosition(location.latitude, location.longitude)}
          aria-hidden="true"
          key={location.name}
        >
          {location.number}
        </span>
      ))}
    </div>
  );
}

type ServiceAreaMapProps = {
  mapUrl: string | null;
};

export function ServiceAreaMap({ mapUrl }: ServiceAreaMapProps) {
  const [status, setStatus] = useState<MapStatus>(
    mapUrl ? "loading" : "fallback",
  );

  const showLiveMap = Boolean(mapUrl) && status !== "fallback";

  function handleMapError() {
    setStatus("fallback");

    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Rent Wise service-area map could not be loaded; using the local fallback.",
      );
    }
  }

  return (
    <figure className="service-area-map" aria-busy={status === "loading"}>
      {showLiveMap ? (
        <>
          <div className="map-loading-placeholder" aria-hidden="true" />
          <Image
            key={mapUrl}
            src={mapUrl as string}
            alt="Map showing Rent Wise service areas across Reading and surrounding Berkshire locations."
            fill
            unoptimized
            sizes="(max-width: 940px) 100vw, 42vw"
            className={status === "loaded" ? "is-loaded" : undefined}
            onLoad={() => setStatus("loaded")}
            onError={handleMapError}
          />
        </>
      ) : (
        <MapFallback />
      )}

      <span className="service-map-label">Reading &amp; surrounding areas</span>
      <figcaption>
        Numbered markers correspond to the adjacent service-area list.
      </figcaption>

      {showLiveMap ? (
        <p className="map-attribution">
          <a
            href="https://www.mapbox.com/about/maps/"
            target="_blank"
            rel="noreferrer"
          >
            &copy; Mapbox
          </a>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
          >
            &copy; OpenStreetMap
          </a>
        </p>
      ) : null}
    </figure>
  );
}
