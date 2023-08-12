import jwt from "jsonwebtoken";

const signToken = ({ username, name, id }) => {
  if (!username || !id) {
    throw new Error("data is not provided correctly");
  }
  return jwt.sign(
    { username, name, id },
    process.env.SECRET || "dwadawdwadaadwawdawhfjawhfuawdwdwaawd"
  );
};

const checkToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(
      token,
      process.env.SECRET || "dwadawdwadaadwawdawhfjawhfuawdwdwaawd"
    );
  } catch (e) {
    throw new Error("Token is not valid");
  }

  return true;
};

export { signToken, checkToken };
