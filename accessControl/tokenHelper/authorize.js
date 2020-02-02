var jwtDecode = require("jwt-decode");
var jwt = require("jsonwebtoken");
const { Admin, UserRole } = require("../tokenHelper/role.js");

const authorizeTodos = (rolesProvided = [role1, role2]) => {
  const roles = [];
  roles.push(rolesProvided[0]);
  roles.push(rolesProvided[1]);

  return [
    // authorize based on user role
    (request, response, next) => {
      const token = request.get("Authorization");

      if (!token.includes("Bearer")) {
        return response.status(401).json({ message: "Not a bearer token" });
      }

      const tokenPart = token.split(" ");

      if (tokenPart.length != 2) {
        return response
          .status(401)
          .json({ message: "Not a valid bearer token" });
      }

      const encryptedToken = tokenPart[1];

      let decrypted = "";
      try {
        decrypted = jwt.verify(encryptedToken, process.env.SECRET);
      } catch (exception) {
        return response
          .status(401)
          .json({ message: "Not a valid bearer token" });
      }

      request.decrypted = decrypted;

      if (!roles.find(role => role == decrypted.role)) {
        return response.status(401).json({ message: "Invalid user" });
      }

      next();

      // authentication and authorization successful
    }
  ];
};

module.exports = { authorizeTodos };
