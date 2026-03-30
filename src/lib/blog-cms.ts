import { createClient } from "contentful";

export type CmsBlogPost = {
  entryId?: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  content: string[];
  tags?: string[];
};

type CreateCmsBlogPostInput = {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  content: string;
  tags?: string[];
};

type UpdateCmsBlogPostInput = CreateCmsBlogPostInput & {
  entryId: string;
};

export type CmsAdminBlogPost = CmsBlogPost & {
  entryId: string;
  contentMarkdown: string;
};

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const managementToken = import.meta.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN;
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT ?? "master";
const blogContentType = import.meta.env.VITE_CONTENTFUL_BLOG_CONTENT_TYPE ?? "blogPost";
const locale = import.meta.env.VITE_CONTENTFUL_LOCALE ?? "en-US";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseContentToParagraphs(content: string) {
  return content
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

function mapFieldsToPost(fields: Record<string, unknown>, entryId?: string): CmsBlogPost {
  const title = typeof fields.title === "string" ? fields.title : "Untitled";
  const slug = typeof fields.slug === "string" ? fields.slug : slugify(title);
  const excerpt = typeof fields.excerpt === "string" ? fields.excerpt : "";
  const author = typeof fields.author === "string" ? fields.author : "Admin";
  const category = typeof fields.category === "string" ? fields.category : "General";
  const date =
    typeof fields.publishDate === "string"
      ? fields.publishDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10);
  const markdown = typeof fields.content === "string" ? fields.content : "";
  const tags = Array.isArray(fields.tags)
    ? fields.tags.filter((tag): tag is string => typeof tag === "string")
    : undefined;

  return {
    entryId,
    slug,
    title,
    excerpt,
    author,
    date,
    category,
    content: parseContentToParagraphs(markdown),
    tags,
  };
}

function getManagementConfig() {
  if (!space || !managementToken) {
    throw new Error(
      "Contentful config missing: set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_MANAGEMENT_TOKEN in .env",
    );
  }

  return {
    baseUrl: `https://api.contentful.com/spaces/${space}/environments/${environment}`,
    token: managementToken,
  };
}

async function getManagementEntry(entryId: string) {
  const { baseUrl, token } = getManagementConfig();
  const response = await fetch(`${baseUrl}/entries/${entryId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to fetch Contentful entry (status ${response.status}). Details: ${errorBody}`,
    );
  }

  return (await response.json()) as {
    sys: { id: string; version: number };
    fields: Record<string, Record<string, unknown>>;
  };
}

function buildEntryPayload(input: CreateCmsBlogPostInput) {
  return {
    title: { [locale]: input.title },
    slug: { [locale]: slugify(input.title) },
    excerpt: { [locale]: input.excerpt },
    content: { [locale]: input.content },
    author: { [locale]: input.author },
    category: { [locale]: input.category },
    publishDate: { [locale]: new Date().toISOString() },
    tags: { [locale]: input.tags ?? [] },
  };
}

async function publishManagementEntry(entryId: string, version: number) {
  const { baseUrl, token } = getManagementConfig();
  const publishResponse = await fetch(`${baseUrl}/entries/${entryId}/published`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      "X-Contentful-Version": String(version),
    },
  });

  if (!publishResponse.ok) {
    const errorBody = await publishResponse.text();
    throw new Error(
      `Failed to publish Contentful entry (status ${publishResponse.status}). Details: ${errorBody}`,
    );
  }
}

function getDeliveryClient() {
  if (!space || !accessToken) {
    return null;
  }

  return createClient({
    space,
    accessToken,
    environment,
  });
}

export async function getCmsBlogPosts(): Promise<CmsBlogPost[]> {
  const client = getDeliveryClient();

  if (!client) {
    return [];
  }

  try {
    const response = await client.getEntries({
      content_type: blogContentType,
      order: ["-fields.publishDate"],
      limit: 100,
    });

    return response.items.map((item) =>
      mapFieldsToPost(
        item.fields as Record<string, unknown>,
        typeof item.sys.id === "string" ? item.sys.id : undefined,
      ),
    );
  } catch {
    return [];
  }
}

export async function getCmsBlogPostsForAdmin(): Promise<CmsAdminBlogPost[]> {
  const client = getDeliveryClient();

  if (!client) {
    return [];
  }

  try {
    const response = await client.getEntries({
      content_type: blogContentType,
      order: ["-fields.publishDate"],
      limit: 100,
    });

    return response.items.map((item) => {
      const fields = item.fields as Record<string, unknown>;
      const markdown = typeof fields.content === "string" ? fields.content : "";
      const entryId = typeof item.sys.id === "string" ? item.sys.id : "";

      return {
        ...mapFieldsToPost(fields, entryId),
        entryId,
        contentMarkdown: markdown,
      };
    });
  } catch {
    return [];
  }
}

export async function createCmsBlogPost(input: CreateCmsBlogPostInput) {
  const { baseUrl, token } = getManagementConfig();

  const payload = {
    fields: buildEntryPayload(input),
  };

  const createResponse = await fetch(`${baseUrl}/entries`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      "X-Contentful-Content-Type": blogContentType,
    },
    body: JSON.stringify(payload),
  });

  if (!createResponse.ok) {
    const errorBody = await createResponse.text();
    throw new Error(
      `Failed to create Contentful entry (status ${createResponse.status}). Details: ${errorBody}`,
    );
  }

  const createdEntry = (await createResponse.json()) as {
    sys: { id: string; version: number };
  };

  await publishManagementEntry(createdEntry.sys.id, createdEntry.sys.version);
}

export async function updateCmsBlogPost(input: UpdateCmsBlogPostInput) {
  const { baseUrl, token } = getManagementConfig();
  const existingEntry = await getManagementEntry(input.entryId);

  const updatePayload = {
    fields: {
      ...existingEntry.fields,
      ...buildEntryPayload(input),
    },
  };

  const updateResponse = await fetch(`${baseUrl}/entries/${input.entryId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      "X-Contentful-Version": String(existingEntry.sys.version),
    },
    body: JSON.stringify(updatePayload),
  });

  if (!updateResponse.ok) {
    const errorBody = await updateResponse.text();
    throw new Error(
      `Failed to update Contentful entry (status ${updateResponse.status}). Details: ${errorBody}`,
    );
  }

  const updatedEntry = (await updateResponse.json()) as {
    sys: { id: string; version: number };
  };

  await publishManagementEntry(updatedEntry.sys.id, updatedEntry.sys.version);
}

export async function deleteCmsBlogPost(entryId: string) {
  const { baseUrl, token } = getManagementConfig();
  const existingEntry = await getManagementEntry(entryId);

  const unpublishResponse = await fetch(`${baseUrl}/entries/${entryId}/published`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      "X-Contentful-Version": String(existingEntry.sys.version),
    },
  });

  if (!unpublishResponse.ok && unpublishResponse.status !== 404) {
    const errorBody = await unpublishResponse.text();
    throw new Error(
      `Failed to unpublish Contentful entry (status ${unpublishResponse.status}). Details: ${errorBody}`,
    );
  }

  const latestEntry = await getManagementEntry(entryId);
  const deleteResponse = await fetch(`${baseUrl}/entries/${entryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      "X-Contentful-Version": String(latestEntry.sys.version),
    },
  });

  if (!deleteResponse.ok) {
    const errorBody = await deleteResponse.text();
    throw new Error(
      `Failed to delete Contentful entry (status ${deleteResponse.status}). Details: ${errorBody}`,
    );
  }
}
