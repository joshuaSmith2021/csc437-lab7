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

export const sendLoginRequest = (username: string, password: string) =>
  new Promise<Credentials>((resolve, reject) => {
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
