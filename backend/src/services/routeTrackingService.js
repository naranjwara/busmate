const routeTracking = {
  'kos-kampus': {
    id: 'kos-kampus',
    name: 'Kos - Kampus',
    currentLocation: {
      name: 'Kos Dina, Bandung',
      lat: -6.89044,
      lng: 107.60958,
    },
    destination: {
      name: 'Kampus',
      lat: -6.89385,
      lng: 107.61772,
    },
    stops: [
      { id: 'dago-station', name: 'Dago Station', lat: -6.88899, lng: 107.61124 },
      { id: 'taman-sari', name: 'Taman Sari', lat: -6.8917, lng: 107.61441 },
      { id: 'kampus-gate', name: 'Kampus Gate', lat: -6.89385, lng: 107.61772 },
    ],
    polyline: [
      [-6.89044, 107.60958],
      [-6.88899, 107.61124],
      [-6.89072, 107.61322],
      [-6.8917, 107.61441],
      [-6.89284, 107.6162],
      [-6.89385, 107.61772],
    ],
  },
  'kampus-mall': {
    id: 'kampus-mall',
    name: 'Kampus - Mall',
    currentLocation: {
      name: 'Kampus',
      lat: -6.89385,
      lng: 107.61772,
    },
    destination: {
      name: 'Mall',
      lat: -6.87912,
      lng: 107.59683,
    },
    stops: [
      { id: 'kampus-gate', name: 'Kampus Gate', lat: -6.89385, lng: 107.61772 },
      { id: 'sukajadi', name: 'Sukajadi', lat: -6.88478, lng: 107.60425 },
      { id: 'mall-stop', name: 'Mall Stop', lat: -6.87912, lng: 107.59683 },
    ],
    polyline: [
      [-6.89385, 107.61772],
      [-6.89026, 107.61211],
      [-6.88478, 107.60425],
      [-6.88182, 107.60041],
      [-6.87912, 107.59683],
    ],
  },
}

export const getRouteTracking = (routeId) => routeTracking[routeId] || null
