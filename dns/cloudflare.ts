import path from "path";
import fs from "fs";

export interface UpdateDNSParams {
  zone: string;
  name: string;
  type: "A" | "AAAA" | "CNAME" | "TXT";
  value: string;
  proxied?: boolean;
  ttl?: number;
}

interface CloudflareResponse<T> {
  success: boolean;
  errors: { code: number; message: string }[];
  result: T;
}

const API_BASE = "https://api.cloudflare.com/client/v4";

function loadToken(): string {
  const token = process.env.CLOUDFLARE_API_TOKEN;

  if (token && token.trim().length > 0) {
    return token.trim();
  }

  const tokenFile = path.resolve("secrets", "cf_api_token.env");
  if (fs.existsSync(tokenFile)) {
    const raw = fs.readFileSync(tokenFile, "utf-8");
    const envToken = raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.startsWith("CLOUDFLARE_API_TOKEN="));

    if (envToken) {
      const value = envToken.split("=").slice(1).join("=").trim();
      if (value) {
        return value;
      }
    }
  }

  throw new Error(
    "CLOUDFLARE_API_TOKEN not provided. Set env or add secrets/cf_api_token.env"
  );
}

async function fetchJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = (await response.json()) as CloudflareResponse<T>;

  if (!data.success) {
    const message = data.errors.map((e) => `${e.code}: ${e.message}`).join(", ");
    throw new Error(`Cloudflare API error: ${message || response.statusText}`);
  }

  return data.result;
}

async function getZoneId(token: string, zone: string): Promise<string> {
  const url = `${API_BASE}/zones?name=${encodeURIComponent(zone)}`;
  const result = await fetchJson<{ id: string }[]>(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const zoneInfo = result[0];
  if (!zoneInfo) {
    throw new Error(`Zone not found for ${zone}`);
  }

  return zoneInfo.id;
}

async function findExistingRecord(
  token: string,
  zoneId: string,
  name: string,
  type: string
): Promise<{ id: string } | undefined> {
  const url = `${API_BASE}/zones/${zoneId}/dns_records?type=${encodeURIComponent(
    type
  )}&name=${encodeURIComponent(name)}`;

  const result = await fetchJson<{ id: string }[]>(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result[0];
}

async function upsertRecord(
  token: string,
  zoneId: string,
  params: UpdateDNSParams
) {
  const payload = {
    type: params.type,
    name: `${params.name}.${params.zone}`.replace(/\.+$/, ""),
    content: params.value,
    ttl: params.ttl ?? 120,
    proxied: params.proxied ?? true,
  };

  const existing = await findExistingRecord(token, zoneId, payload.name, payload.type);

  if (existing) {
    await fetchJson(`${API_BASE}/zones/${zoneId}/dns_records/${existing.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return;
  }

  await fetchJson(`${API_BASE}/zones/${zoneId}/dns_records`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function updateDNS(params: UpdateDNSParams) {
  const token = loadToken();
  const zoneId = await getZoneId(token, params.zone);
  await upsertRecord(token, zoneId, params);
  return {
    zoneId,
    record: `${params.name}.${params.zone}`,
    value: params.value,
  };
}
