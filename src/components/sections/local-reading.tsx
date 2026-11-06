import { ServiceAreaMap } from "@/components/sections/service-area-map";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { StaggerItem } from "@/components/motion/stagger-item";
import { serviceAreaLocations, serviceAreas } from "@/lib/homepage-content";

const DEFAULT_MAP_STYLE = {
  username: "mapbox",
  styleId: "light-v11",
} as const;

const MAP_VIEW = {
  longitude: -0.9685,
  latitude: 51.4475,
  zoom: 11.45,
  bearing: 0,
  pitch: 0,
  width: 1000,
  height: 750,
} as const;

type MapStyle = {
  username: string;
  styleId: string;
};

function getMapStyle(styleUrl: string | undefined): MapStyle {
  if (!styleUrl) {
    return DEFAULT_MAP_STYLE;
  }

  const match = styleUrl
    .trim()
    .match(
      /^mapbox:\/\/styles\/([a-z0-9][a-z0-9_-]{0,63})\/([a-z0-9][a-z0-9_-]{0,127})$/i,
    );

  if (!match) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "The configured Mapbox style URL is invalid; using the default light style.",
      );
    }

    return DEFAULT_MAP_STYLE;
  }

  return { username: match[1], styleId: match[2] };
}

function getMapUrl(token: string, style: MapStyle) {
  const markers = serviceAreaLocations
    .map(
      (location) =>
        `pin-s-${Number(location.number)}+28483b(${location.longitude},${location.latitude})`,
    )
    .join(",");
  const position = [
    MAP_VIEW.longitude,
    MAP_VIEW.latitude,
    MAP_VIEW.zoom,
    MAP_VIEW.bearing,
    MAP_VIEW.pitch,
  ].join(",");
  const query = new URLSearchParams({
    access_token: token,
    attribution: "false",
    logo: "true",
  });

  return `https://api.mapbox.com/styles/v1/${encodeURIComponent(style.username)}/${encodeURIComponent(style.styleId)}/static/${markers}/${position}/${MAP_VIEW.width}x${MAP_VIEW.height}@2x?${query.toString()}`;
}

export function LocalReading() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim();
  const isPublicToken = mapboxToken?.startsWith("pk.") ?? false;
  const mapStyle = getMapStyle(
    process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL?.trim(),
  );
  const mapUrl =
    mapboxToken && isPublicToken ? getMapUrl(mapboxToken, mapStyle) : null;

  if (!isPublicToken && process.env.NODE_ENV === "development") {
    console.warn(
      "Rent Wise service-area map is using the local fallback because a public Mapbox token is unavailable.",
    );
  }

  return (
    <section
      id="about"
      className="section-block local-section"
      aria-labelledby="local-title"
    >
      <div className="site-container local-layout">
        <Reveal className="local-copy" preset="fade-right">
          <p className="eyebrow">Based in Reading</p>
          <h2 id="local-title">Local management for Reading landlords.</h2>
          <p>
            Rent Wise is focused on residential properties in Reading and
            surrounding Berkshire areas, providing landlords with a local point
            of contact and a clearly managed service.
          </p>
          <p className="local-note">
            These are service areas, not claims about an existing property
            portfolio.
          </p>
        </Reveal>

        <Reveal
          id="service-areas"
          className="service-area-panel"
          delay={0.08}
          preset="fade-left"
        >
          <h3>Service area</h3>
          <div className="service-area-content">
            <ServiceAreaMap
              key={mapUrl ? "mapbox-live" : "mapbox-fallback"}
              mapUrl={mapUrl}
            />

            <StaggerGroup as="ol" className="service-area-list">
              {serviceAreas.map((area, index) => (
                <StaggerItem as="li" key={area}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {area}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
