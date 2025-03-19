type AuthFunction = (
  username: string,
  password: string,
  setToken: (token: string | undefined) => void,
  setError: (error: string) => void,
) => Promise<string | undefined>;

export const login: AuthFunction = async (
  username,
  password,
  setToken,
  setError,
) => {
  const token = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then(async (res) => {
      if (res.status === 200) {
        return res.text();
      } else {
        const { message } = (await res.json()) as { message: string };
        setError(message);
        return undefined;
      }
    })
    .catch((e) => {
      setError(e);
      return undefined;
    });

  setToken(token);

  return token;
};

export const register: AuthFunction = async (
  username,
  password,
  setToken,
  setError,
) => {
  const token = await fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then(async (res) => {
      if (res.status === 201) {
        return res.text();
      } else {
        const { message } = (await res.json()) as { message: string };
        setError(message);
        return undefined;
      }
    })
    .catch((e) => {
      setError(e);
      return undefined;
    });

  setToken(token);

  return token;
};
