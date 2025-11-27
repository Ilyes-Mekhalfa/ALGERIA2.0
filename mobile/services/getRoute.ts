export type LatLng = {
  latitude: number;
  longitude: number;
};

type ORSLatLng = {
  lat: number;
  lng: number;
};

export async function getRoute(
  start: ORSLatLng,
  end: ORSLatLng,
  apiKey: string = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjlkODFjMjE5NDhjNzQzZTk5ZmIxNTlkZjBjOGIxZjNjIiwiaCI6Im11cm11cjY0In0="
): Promise<LatLng[]> {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const json = await response.json();

    if (!json.features || !json.features[0]) {
      throw new Error("Invalid response: no features found");
    }

    const coords = json.features[0].geometry.coordinates;

    return coords.map(([lng, lat]: [number, number]) => ({
      latitude: lat,
      longitude: lng,
    }));
  } catch (error) {
    console.error("Error in getRoute:", error);
    return []; // prevent app crash
  }
}
