import { createClient } from "contentful";
import env from "./env";

// Global cache to store fetched entries
const globalCache = {};

// Global rate limiting variables
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 300; // Minimum time between requests in milliseconds

const useContentful = () => {
  const CONTENTFUL_SPACE_ID = env.CONTENTFUL_SPACE_ID;
  const CONTENTFUL_ACCESS_TOKEN = env.CONTENTFUL_ACCESS_TOKEN;

  const client = createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
    host: "preview.contentful.com",
  });

  // Function to enforce rate limiting
  const throttleRequest = async () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const delay = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    lastRequestTime = Date.now();
  };

  const fetchData = async (contentType, sanitizeFunc) => {
    // Return cached data if available
    const cacheKey = `${contentType}`;
    if (globalCache[cacheKey]) {
      return globalCache[cacheKey];
    }

    const MAX_RETRIES = 5;
    const RETRY_DELAY_BASE = 2000; // Increased base delay for exponential backoff

    const retryFetch = async (attempt = 1) => {
      try {
        // Respect rate limits
        await throttleRequest();

        const entries = await client.getEntries({ content_type: contentType });
        const sanitizedEntries = sanitizeFunc(entries.items);

        // Store in cache
        globalCache[cacheKey] = sanitizedEntries;
        return sanitizedEntries;
      } catch (error) {
        if (
          error.sys &&
          error.sys.id === "RateLimitExceeded" &&
          attempt < MAX_RETRIES
        ) {
          // Calculate exponential backoff with jitter
          const delay =
            RETRY_DELAY_BASE * Math.pow(2, attempt - 1) + Math.random() * 1000;
          console.warn(
            `Rate limit exceeded, retrying in ${Math.round(
              delay
            )}ms... (attempt ${attempt}/${MAX_RETRIES})`
          );

          await new Promise((resolve) => setTimeout(resolve, delay));
          return retryFetch(attempt + 1);
        }
        console.error(`Error fetching ${contentType}:`, error);

        // Fallback to empty array if all retries fail
        return [];
      }
    };

    return retryFetch();
  };

  const getIntroduction = async () => {
    return fetchData("introductionText", (items) =>
      items.map((item) => ({ introduction: item.fields.introduction }))
    );
  };

  const getServiceCard = async () => {
    return fetchData("serviceCard", (items) =>
      items.map((item) => ({
        service: item.fields.service,
        description: item.fields.description,
        icon: item.fields.icon?.fields?.file?.url || "",
      }))
    );
  };

  const getHeroText = async () => {
    return fetchData("heroText", (items) =>
      items.map((item) => ({ heroText: item.fields.heroText }))
    );
  };

  const getWorkExperience = async () => {
    return fetchData("workExperience", (items) =>
      items.map((item) => ({
        title: item.fields.title,
        company: item.fields.company,
        description: item.fields.description,
        workDate: item.fields.workDate,
        endWorkDate: item.fields.endWorkDate,
        logo: item.fields.logo?.fields?.file?.url || null,
      }))
    );
  };

  const getTechnologies = async () => {
    return fetchData("technology", (items) =>
      items.map((item) => ({
        name: item.fields.language,
        logo: item.fields.logo?.fields?.file?.url || "",
      }))
    );
  };

  const getProjects = async () => {
    return fetchData("projects", (items) =>
      items.map((item) => ({
        name: item.fields.projectName,
        description: item.fields.description,
        tags: item.fields.tags,
        image: item.fields.frontImage?.fields
          ? {
              url: item.fields.frontImage.fields.file.url,
              description: item.fields.frontImage.fields.description,
            }
          : { url: "", description: "" },
        images:
          item.fields.images?.map((image) => ({
            url: image.fields.file.url,
            description: image.fields.description,
          })) || [],
        projectUrl: item.fields.gitHubUrl,
      }))
    );
  };

  return {
    getIntroduction,
    getServiceCard,
    getHeroText,
    getWorkExperience,
    getTechnologies,
    getProjects,
  };
};

export default useContentful;
