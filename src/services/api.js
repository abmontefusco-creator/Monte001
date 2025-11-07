export async function fetchTenantData(tenantId) {
  const response = await fetch(`http://localhost:5000/api/data/${tenantId}`);
  if (!response.ok) throw new Error("Errore nel recupero dati");
  return await response.json();
}
