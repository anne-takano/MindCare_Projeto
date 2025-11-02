/**
 * Calcula a distância entre duas coordenadas geográficas usando a fórmula de Haversine
 * @param {number} lat1 - Latitude do primeiro ponto
 * @param {number} lon1 - Longitude do primeiro ponto
 * @param {number} lat2 - Latitude do segundo ponto
 * @param {number} lon2 - Longitude do segundo ponto
 * @returns {number} Distância em quilômetros
 */
export function calcularDistancia(lat1, lon1, lat2, lon2) {
  // Raio da Terra em quilômetros
  const R = 6371;

  // Converte graus para radianos
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  // Fórmula de Haversine
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distância em quilômetros
  const distancia = R * c;

  return Math.round(distancia * 10) / 10; // Arredonda para 1 casa decimal
}

