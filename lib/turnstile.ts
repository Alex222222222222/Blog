async function verify_turnstile_response(
  response: string,
  secret_key: string,
  ip: string
): Promise<boolean> {
  // Validate the token by calling the
  // "/siteverify" API endpoint.
  let formData = new FormData();
  formData.append("secret", secret_key);
  formData.append("response", response);
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome = await result.json();
  if (outcome.success) {
    return true;
  }

  return false;
}
