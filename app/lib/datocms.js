export const performRequest = async ({ query, variables = {}, includeDrafts = false }) => {
  const response = await fetch("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });
  
  const responseBody = await response.json();
  
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(responseBody)}`);
  }
  
  return responseBody;
}

// used for pagination, it's the limit of products displayed on the page
export const limit = 16;