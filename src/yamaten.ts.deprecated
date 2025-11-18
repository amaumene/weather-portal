import { distance } from "@turf/distance";
import { point } from "@turf/helpers";
import { mountains } from "./yamaten_data";

export type YamatenItem = {
  mid: string;
  name: string;
  subname?: string;
  lat?: number;
  lon?: number;
  place_id?: string;
};

type ValidYamatenItem = {
  mid: string;
  name: string;
  lat: number;
  lon: number;
};

const validMountains = mountains.filter(
  (m): m is ValidYamatenItem => m.lat !== undefined && m.lon !== undefined,
);

export const getYamatenID = (place: { lat: number; lon: number }): string | undefined => {
  const item = validMountains.find(
    (m) => m.lat === place.lat && m.lon === place.lon,
  );
  if (item) {
    return item.mid;
  }
  const from = point([place.lon, place.lat]);
  // Find the closest mountain within 5 km
  let minDist = Infinity;
  let found: ValidYamatenItem | undefined = undefined;
  for (const m of validMountains) {
    const to = point([m.lon, m.lat]);
    const dist = distance(from, to, { units: "kilometers" });
    if (dist <= 5 && dist < minDist) {
      minDist = dist;
      found = m;
    }
  }
  return found?.mid;
};
