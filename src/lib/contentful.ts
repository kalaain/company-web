import { createClient } from "contentful";

type HomePageFields = {
  title?: string;
  description?: string;
};

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT ?? "master";

function getClient() {
  if (!space || !accessToken) {
    return null;
  }

  return createClient({
    space,
    accessToken,
    environment,
  });
}

export async function getHomePageContent() {
  const client = getClient();

  if (!client) {
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: "homepage",
      limit: 1,
    });

    const fields = response.items[0]?.fields as HomePageFields | undefined;

    if (!fields) {
      return null;
    }

    return {
      title: typeof fields.title === "string" ? fields.title : undefined,
      description: typeof fields.description === "string" ? fields.description : undefined,
    };
  } catch {
    return null;
  }
}
