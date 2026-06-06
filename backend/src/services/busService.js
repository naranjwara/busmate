const nearbyBuses = [
  {
    id: 'bus-05',
    number: '05',
    name: 'Bus 05 - Dago',
    etaMinutes: 4,
    status: 'NORMAL',
    routeId: 'kos-kampus',
    position: {
      lat: -6.89192,
      lng: 107.61071,
    },
  },
  {
    id: 'bus-12',
    number: '12',
    name: 'Bus 12 - Leuwipanjang',
    etaMinutes: 11,
    status: 'FULL',
    routeId: 'kampus-mall',
    position: {
      lat: -6.88478,
      lng: 107.60425,
    },
  },
  {
    id: 'bus-13',
    number: '13',
    name: 'Bus 13 - Sukajadi',
    etaMinutes: 11,
    status: 'NORMAL',
    routeId: 'kampus-mall',
    position: {
      lat: -6.88478,
      lng: 107.60425,
    },
  },
]

export const getNearbyBuses = () => nearbyBuses
