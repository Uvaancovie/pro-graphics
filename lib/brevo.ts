const BREVO_CONTACTS_API_URL = 'https://api.brevo.com/v3/contacts';

type BrevoContactAttributes = Record<string, string | number | boolean | null | undefined>;

type UpsertBrevoContactArgs = {
  email: string;
  listIds: number[];
  attributes?: BrevoContactAttributes;
};

function getBrevoApiKey() {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('Missing BREVO_API_KEY');
  }

  return apiKey;
}

function cleanAttributes(attributes: BrevoContactAttributes = {}) {
  return Object.fromEntries(
    Object.entries(attributes).filter(([, value]) => value !== undefined)
  );
}

export function getBrevoListId(envName: string, fallback: number) {
  const rawValue = process.env[envName];

  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsedValue)) {
    return fallback;
  }

  return parsedValue;
}

export async function upsertBrevoContact({ email, listIds, attributes = {} }: UpsertBrevoContactArgs) {
  const apiKey = getBrevoApiKey();

  const response = await fetch(BREVO_CONTACTS_API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      attributes: cleanAttributes(attributes),
      listIds,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Brevo contact upsert failed (${response.status}): ${errorData?.message || response.statusText}`
    );
  }

  return response.json().catch(() => ({}));
}
