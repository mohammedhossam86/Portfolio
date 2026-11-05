import { GitLabConfig, GitLabMergeRequest, BlogPost } from "@/types";

// ─── GitLab API Configuration ────────────────────────────────────────────────

export const gitlabConfig: GitLabConfig = {
  baseUrl: "https://gitlab.com",
  username: "mohammedhossam86",
  accessToken: process.env.GITLAB_ACCESS_TOKEN,
  maxResults: 20,
};

// ─── Verified GitLab Core Contributions (Concise & Impactful) ────────────────

export const fallbackGitLabMRs: GitLabMergeRequest[] = [
  {
    "id": 508859970,
    "iid": 246455,
    "title": "Add name to merge_request_dashboard Vue constructor",
    "description": "Adds a `name` property to the `new Vue()` root instance in `app/assets/javascripts/merge_request_dashboard/index.js` ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246455",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:52:59.494Z",
    "mergedAt": "2026-07-27T17:17:40.394Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508859967,
    "iid": 246454,
    "title": "Add name to CI variable list Vue constructor",
    "description": "Adds a `name` property to the `new Vue()` root instance in `app/assets/javascripts/ci/ci_variable_list/index.js` to s...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246454",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:52:54.303Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508859964,
    "iid": 246453,
    "title": "Add name to CI artifacts Vue constructor",
    "description": "Adds a `name` property to the `new Vue()` root instance in `app/assets/javascripts/ci/artifacts/index.js` to satisfy ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246453",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:52:48.678Z",
    "mergedAt": "2026-07-23T12:10:20.989Z",
    "labels": [
      "Category:Job Artifacts",
      "Community contribution",
      "UX"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508859960,
    "iid": 246452,
    "title": "Add name to snippets Vue constructor",
    "description": "Adds a `name` property to the `new Vue()` root instance in `app/assets/javascripts/snippets/index.js` to satisfy the ...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246452",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:52:42.809Z",
    "labels": [
      "Category:Source Code Management",
      "Community contribution",
      "UX"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508859955,
    "iid": 246451,
    "title": "Add name to code_navigation Vue constructor",
    "description": "Adds a `name` property to the `new Vue()` root instance in `app/assets/javascripts/code_navigation/index.js` to satis...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246451",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:52:37.557Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508858936,
    "iid": 246450,
    "title": "Add name property to credentials vue component",
    "description": "Adds the `name` property to the `credentials` Vue component to satisfy the `vue/require-name-property` ESLint rule, a...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246450",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:28:03.216Z",
    "mergedAt": "2026-07-24T14:12:43.234Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508858895,
    "iid": 246449,
    "title": "Add name property to geo_sites vue component",
    "description": "Adds the `name` property to the `geo_sites` Vue component to satisfy the `vue/require-name-property` ESLint rule, and...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246449",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:27:11.899Z",
    "labels": [
      "Category:Geo Replication",
      "Community contribution",
      "UX"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508858887,
    "iid": 246448,
    "title": "Add name property to dependencies vue component",
    "description": "Adds the `name` property to the `dependencies` Vue component to satisfy the `vue/require-name-property` ESLint rule, ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246448",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:27:06.018Z",
    "mergedAt": "2026-07-24T14:22:47.173Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508858883,
    "iid": 246447,
    "title": "Add name property to CI secrets vue component",
    "description": "Adds the `name` property to the `CI secrets` Vue component to satisfy the `vue/require-name-property` ESLint rule, an...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246447",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:27:00.911Z",
    "mergedAt": "2026-07-27T15:12:17.340Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508858881,
    "iid": 246446,
    "title": "Add name property to CI pipeline_details tabs vue component",
    "description": "Adds the `name` property to the `CI pipeline_details tabs` Vue component to satisfy the `vue/require-name-property` E...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246446",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-19T03:26:55.728Z",
    "labels": [
      "Category:Continuous Integration",
      "Community contribution",
      "UX"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508751824,
    "iid": 246438,
    "title": "Add name property to branches vue components",
    "description": "Adds the `name` property to the `branches` Vue components to satisfy the `vue/require-name-property` ESLint rule, and...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246438",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-18T06:31:16.293Z",
    "mergedAt": "2026-07-21T13:49:05.564Z",
    "labels": [
      "Category:Source Code Management",
      "Community contribution",
      "UX"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508751696,
    "iid": 246437,
    "title": "Add name property to crm vue components",
    "description": "Adds the `name` property to the `crm` Vue components to satisfy the `vue/require-name-property` ESLint rule, and remo...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246437",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-18T06:29:15.612Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 508751287,
    "iid": 246436,
    "title": "Add name property to contribution_events vue components",
    "description": "Adds the `name` property to the `contribution_events` Vue components to satisfy the `vue/require-name-property` ESLin...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/246436",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-07-18T06:23:24.656Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 484232164,
    "iid": 235710,
    "title": "Fix vue/custom-event-name-casing in analytics/shared",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/235710",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-13T02:04:15.984Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 484229147,
    "iid": 235709,
    "title": "Fix vue/custom-event-name-casing in captcha",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/235709",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-13T01:56:24.411Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 484226578,
    "iid": 235708,
    "title": "Fix vue/custom-event-name-casing in cycle_analytics",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/235708",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-13T01:44:33.089Z",
    "mergedAt": "2026-05-20T08:36:46.131Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 484224501,
    "iid": 235706,
    "title": "Fix vue/custom-event-name-casing in add_context_commits_modal",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/235706",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-13T01:31:12.286Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 484223509,
    "iid": 235702,
    "title": "Fix vue/require-explicit-emits in admin/users/components/user_type",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/235702",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-13T01:21:21.022Z",
    "mergedAt": "2026-05-15T20:00:40.955Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 484223055,
    "iid": 235701,
    "title": "Fix vue/require-explicit-emits in runner_token_expiration",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/235701",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-13T01:16:23.878Z",
    "mergedAt": "2026-05-18T15:21:21.255Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 484222477,
    "iid": 235698,
    "title": "Fix vue/require-explicit-emits in admin/abuse_report",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/235698",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-13T01:10:39.894Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 484221393,
    "iid": 235696,
    "title": "Fix vue/require-explicit-emits in add_context_commits_modal",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/235696",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-13T01:02:05.254Z",
    "mergedAt": "2026-05-13T20:10:59.413Z",
    "labels": [
      "Community contribution",
      "automation:ml",
      "frontend"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 484220940,
    "iid": 235693,
    "title": "Fix vue/require-explicit-emits in abuse_reports",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/235693",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-13T00:56:41.782Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 480170279,
    "iid": 127,
    "title": "Draft: [FixPipeline] https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/pipelines/2493987034",
    "description": "The `eslint-changed-files` CI job failed because the `@gitlab/require-i18n-strings` ESLint rule fired on the string l...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/merge_requests/127",
    "projectName": "gitlab-community/gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab",
    "createdAt": "2026-05-01T18:45:01.083Z",
    "labels": [],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 480168553,
    "iid": 126,
    "title": "Draft: [FixPipeline] https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/pipelines/2493987034",
    "description": "The pipeline was failing due to an ESLint rule violation (`@gitlab/require-i18n-strings`) flagging the string `'Token...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/merge_requests/126",
    "projectName": "gitlab-community/gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab",
    "createdAt": "2026-05-01T18:35:11.897Z",
    "labels": [],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 480168356,
    "iid": 125,
    "title": "Draft: [FixPipeline] https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/pipelines/2493987034",
    "description": "The pipeline was failing because the `name: 'Token'` property in `app/assets/javascripts/access_tokens/components/tok...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/merge_requests/125",
    "projectName": "gitlab-community/gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab",
    "createdAt": "2026-05-01T18:34:13.210Z",
    "labels": [],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 480168340,
    "iid": 124,
    "title": "Draft: [FixPipeline] https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/pipelines/2493987034",
    "description": "The pipeline was failing because the `name: 'Token'` property in `app/assets/javascripts/access_tokens/components/tok...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/merge_requests/124",
    "projectName": "gitlab-community/gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab",
    "createdAt": "2026-05-01T18:34:08.881Z",
    "labels": [],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 480161641,
    "iid": 234246,
    "title": "Add descriptive alt text for Security approval image",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/234246",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-01T17:57:48.855Z",
    "mergedAt": "2026-05-04T07:20:59.775Z",
    "labels": [
      "Community contribution",
      "Technical Writing",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 480148433,
    "iid": 234239,
    "title": "Add name property to access tokens vue components",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/234239",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-01T17:16:45.138Z",
    "mergedAt": "2026-05-08T13:30:53.785Z",
    "labels": [
      "Category:Permissions",
      "Community contribution",
      "UX"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 480146127,
    "iid": 234237,
    "title": "Add name property to artifacts settings vue components",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/234237",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-01T17:05:09.856Z",
    "mergedAt": "2026-05-06T20:25:28.621Z",
    "labels": [
      "Community contribution",
      "UX",
      "automation:ml"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 480143558,
    "iid": 123,
    "title": "Add name property to artifacts settings vue components",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/merge_requests/123",
    "projectName": "gitlab-community/gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab",
    "createdAt": "2026-05-01T16:51:11.897Z",
    "labels": [],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 480142814,
    "iid": 234236,
    "title": "Add name property to access tokens vue components",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/234236",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-05-01T16:47:10.425Z",
    "labels": [
      "Community contribution",
      "devops::developer experience",
      "docs-only"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 479797877,
    "iid": 234047,
    "title": "Add name property to Status Page Settings Vue components",
    "description": "It's a small habit that makes a big difference for our shared compute budget and overall system load. Every pipeline ...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/234047",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-04-30T15:15:36.324Z",
    "mergedAt": "2026-05-01T16:29:09.020Z",
    "labels": [
      "Community contribution",
      "automation:ml",
      "frontend"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 479784349,
    "iid": 234043,
    "title": "Update curl command in resource state events file",
    "description": "update curl command in resource state events file - [ ] Optional. Consider taking [the GitLab Technical Writing Funda...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/234043",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-04-30T14:44:24.532Z",
    "mergedAt": "2026-04-30T18:08:33.366Z",
    "labels": [
      "Community contribution",
      "Technical Writing",
      "docs-only"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 479766702,
    "iid": 234032,
    "title": "update_curl_command_in_resource_state_events_file",
    "description": "Update the curl command in resource state events file This will give reviewers and future readers helpful context.-->",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/234032",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-04-30T14:00:45.601Z",
    "labels": [
      "Community contribution",
      "docs-only",
      "workflow::in dev"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 477735223,
    "iid": 110,
    "title": "Draft: [FixPipeline] https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/pipelines/2463616543",
    "description": "The pipeline was failing due to 6 markdownlint errors in the documentation file for resource milestone events. The er...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/merge_requests/110",
    "projectName": "gitlab-community/gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab",
    "createdAt": "2026-04-24T15:39:02.986Z",
    "labels": [],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 477730042,
    "iid": 109,
    "title": "Draft: [FixPipeline] https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/pipelines/2463637128",
    "description": "The pipeline was failing due to a missing ` ```shell ` opening code fence in `doc/api/resource_milestone_events.md`. ...",
    "state": "closed",
    "webUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab/-/merge_requests/109",
    "projectName": "gitlab-community/gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-community/gitlab-org/gitlab",
    "createdAt": "2026-04-24T15:24:55.252Z",
    "labels": [],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  },
  {
    "id": 475334489,
    "iid": 232029,
    "title": "Update_curl_resource_milestone_events",
    "description": "Update curl examples in file resource_milestone_events.md - [x] Optional. Consider taking [the GitLab Technical Writi...",
    "state": "merged",
    "webUrl": "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/232029",
    "projectName": "gitlab-org/gitlab",
    "projectUrl": "https://gitlab.com/gitlab-org/gitlab",
    "createdAt": "2026-04-18T22:24:51.228Z",
    "mergedAt": "2026-04-29T00:59:25.546Z",
    "labels": [
      "1st contribution",
      "Community contribution",
      "Hackathon"
    ],
    "author": {
      "name": "Mohammed Hossam",
      "avatarUrl": "https://gitlab.com/uploads/-/system/user/avatar/35207831/avatar.png?v=1793838848"
    }
  }
];

// ─── Technical Blog Posts ────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    id: "gitlab-contributions-journey",
    title: "How I Became a Core Contributor to GitLab's Enterprise Codebase",
    excerpt:
      "A deep dive into navigating massive monolithic repositories, submitting clean Merge Requests, and collaborating with international maintainers.",
    url: "https://github.com/mohammedhossam86",
    publishedAt: "2026-08-15",
    tags: ["Open Source", "GitLab", "Career"],
    readTimeMinutes: 6,
  },
  {
    id: "backend-rbac-architecture",
    title: "Architecting Secure 3-Tier RBAC Systems in Node.js & Express",
    excerpt:
      "Practical strategies for ownership verification, route-level authorization, and bulletproof database scoping without middleware bloat.",
    url: "https://github.com/mohammedhossam86",
    publishedAt: "2026-07-01",
    tags: ["Backend", "Node.js", "Security"],
    readTimeMinutes: 8,
  },
  {
    id: "prefix-sum-competitive-programming",
    title: "Mastering Prefix & Partial Sums for 2D Grid Queries in O(1)",
    excerpt:
      "From standard 1D prefix arrays to 2D matrix range updates — the mathematical intuition behind one of competitive programming's most elegant tricks.",
    url: "https://github.com/mohammedhossam86",
    publishedAt: "2026-06-10",
    tags: ["Algorithms", "CP", "Problem Solving"],
    readTimeMinutes: 7,
  },
];
