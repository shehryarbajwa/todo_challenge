var jwtDecode = require("jwt-decode");
var jwt = require("jsonwebtoken");

const { AdminRole, UserRole } = require("../tokenHelper/role.js");

const authorizeTodos = (role1, role2) => {
  roles = [];
  if (typeof roles === "string") {
    roles.append(role1);
    roles.append(role2);
  }

  return [
    // authorize based on user role
    (request, response, next) => {
      const token = request.token;
      const authorization = request.get("authorization");
      let decodedJwt = jwtDecode(token);
      let methods = ["POST", "GET", "PUT", "DELETE"]

      for (const method in methods) {
        if(request.method === method && decodedJwt.role !== AdminRole){
          return response.status(401).json({ message: "Unauthorized" });
        }
      }

      if (authorization && !authorization.toLowerCase().startsWith("bearer ")) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      if (roles.length > 2) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      next();

      // authentication and authorization successful
    }
  ]
}

module.exports = { authorizeTodos };
