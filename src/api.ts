const apiBase = "/api/v1"

export function callAPI(endpoint: string, method: string = "get", body?: any) {
  return fetch(apiBase + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(body),
  }).then(response => response.json())
}