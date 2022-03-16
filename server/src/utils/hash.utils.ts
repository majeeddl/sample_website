import { randomBytes, createHmac } from "crypto";

export class HashUtils {
  public static CreateSalt() {
    const len = 8;
    let _randomBytes = randomBytes(Math.ceil(len / 2))
      .toString("hex")
      .substring(0, len);
    return _randomBytes;
  }

  public static ComputeHash(source: string, salt: string) {
    let hmac = createHmac("sha512", salt);
    let hash = hmac.update(source);
    return hash.digest("hex");
  }
}
