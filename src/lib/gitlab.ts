import { GitLabMergeRequest } from "@/types";
import { gitlabConfig, fallbackGitLabMRs } from "@/data/opensource";

// =============================================================================
// GitLab API Fetcher — Server-Side Only (SSG/ISR)
// =============================================================================
// This utility runs ONLY on the server (in Next.js Server Components or
// generateStaticParams). It fetches your Merge Requests from the GitLab API
// using Next.js fetch caching with revalidation (ISR pattern).
//
// WHY server-side?
// 1. Avoids exposing your GitLab access token to the client bundle.
// 2. Uses Next.js cache → data is fetched at build time and revalidated
//    every hour, so we never hit API rate limits or slow down the client.
// 3. The client receives pre-rendered HTML with the MR data already baked in.
// =============================================================================

const REVALIDATE_SECONDS = 3600; // re-fetch every 1 hour (ISR)

/**
 * Fetch merge requests authored by the configured GitLab user.
 * Uses Next.js `fetch` with `next.revalidate` for ISR caching.
 */
export async function fetchGitLabMergeRequests(): Promise<
  GitLabMergeRequest[]
> {
  const { baseUrl, username, accessToken, maxResults } = gitlabConfig;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["PRIVATE-TOKEN"] = accessToken;
  }

  try {
    // GitLab API: List merge requests authored by a user
    const url = new URL(`${baseUrl}/api/v4/merge_requests`);
    url.searchParams.set("author_username", username);
    url.searchParams.set("scope", "all");
    url.searchParams.set("order_by", "created_at");
    url.searchParams.set("sort", "desc");
    url.searchParams.set("per_page", "100");

    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.warn(
        `GitLab API returned status ${response.status}. Using verified contribution highlights.`
      );
      return fallbackGitLabMRs;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawData: any[] = await response.json();

    if (!Array.isArray(rawData) || rawData.length === 0) {
      return fallbackGitLabMRs;
    }

    // Map GitLab API response to our typed interface
    const mergeRequests: GitLabMergeRequest[] = rawData.map((mr) => ({
      id: mr.id,
      iid: mr.iid,
      title: mr.title,
      description: mr.description || "",
      state: mr.state as GitLabMergeRequest["state"],
      webUrl: mr.web_url,
      projectName: extractProjectName(mr.web_url),
      projectUrl: extractProjectUrl(mr.web_url),
      createdAt: mr.created_at,
      mergedAt: mr.merged_at || undefined,
      labels: mr.labels || [],
      author: {
        name: mr.author?.name || username,
        avatarUrl: mr.author?.avatar_url || "",
      },
    }));

    return mergeRequests;
  } catch (error) {
    console.warn("Could not reach GitLab API (network/offline). Using verified highlights:", error);
    return fallbackGitLabMRs;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Extract project name from MR web URL */
function extractProjectName(webUrl: string): string {
  // URL pattern: https://gitlab.com/group/project/-/merge_requests/123
  const match = webUrl.match(/gitlab\.com\/(.+?)\/-\/merge_requests/);
  if (match) {
    const fullPath = match[1];
    return fullPath.split("/").pop() || fullPath;
  }
  return "Unknown Project";
}

/** Extract project URL from MR web URL */
function extractProjectUrl(webUrl: string): string {
  const match = webUrl.match(/(https:\/\/gitlab\.com\/.+?)\/-\/merge_requests/);
  return match ? match[1] : "#";
}

