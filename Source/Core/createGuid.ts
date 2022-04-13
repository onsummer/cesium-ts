/**
 * Creates a Globally unique identifier (GUID) string.  A GUID is 128 bits long, and can guarantee uniqueness across space and time.
 *
 * @function
 *
 * @returns {string}
 *
 *
 * @example
 * this.guid = Cesium.createGuid();
 *
 * @see {@link http://www.ietf.org/rfc/rfc4122.txt|RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace}
 */
const createGuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  })
}

export default createGuid
