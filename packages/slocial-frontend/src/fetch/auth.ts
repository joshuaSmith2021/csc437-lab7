export const LOCAL_STORAGE_KEYS = {
  username: "username",
  token: "token",
  expiresOn: "expiresOn",
} as const;

const ONE_WEEK_IN_MILLISECONDS = 6.048e8;

type Credentials = {
  /**
   * Username for the user for which the token is valid.
   */
  username: string;
  /**
   * Token that proves a user has authenticated.
   */
  token: string;
  /**
   * Number representing the number of milliseconds past epoch at which the
   * token becomes invalid.
   */
  expiresOn: number;
};

type LoginFunction<T> = (username: string, password: string) => Promise<T>;

export const useCurrentUser = () => {
  const username = localStorage.getItem(LOCAL_STORAGE_KEYS.username);
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
  const expiresOn = localStorage.getItem(LOCAL_STORAGE_KEYS.expiresOn);

  return (
    (username !== null &&
      token !== null &&
      expiresOn !== null &&
      ({ username, token, expiresOn: parseInt(expiresOn) } as Credentials)) ||
    undefined
  );
};

export const doLogout = () => {
  Object.values(LOCAL_STORAGE_KEYS).forEach((key) =>
    localStorage.removeItem(key),
  );
};

const sendLoginRequest: LoginFunction<Credentials> = (username, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username || !password) {
        const missing = [
          ...((!username && ["username"]) || []),
          ...((!password && ["password"]) || []),
        ].join(" and ");

        reject(`${missing} required.`);
      } else if (username === "josh" && password === "josh") {
        resolve({
          username,
          token: "foobartoken",
          expiresOn: Date.now() + ONE_WEEK_IN_MILLISECONDS,
        });
      } else {
        reject("Invalid credentials.");
      }
    }, Math.random() * 1000);
  });

export const attemptLogin: LoginFunction<void> = (username, password) =>
  sendLoginRequest(username, password).then(
    ({ username, token, expiresOn }) => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.username, username);
      localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.expiresOn,
        expiresOn.toString(10),
      );
    },
  );
