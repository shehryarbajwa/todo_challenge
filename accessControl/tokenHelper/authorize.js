var jwtDecode = require('jwt-decode');
const {AdminRole, UserRole} = require('../tokenHelper/role.js')

const authorize = (role1, role2) => {
  roles = []
  if (typeof roles === "string") {
    roles.append(role1)
    roles.append(role2)
  }

  return [

    // authorize based on user role
    (request, response, next) => {
      console.log('response is', request.token)
      const token = request.token
      const username = request.body.username
      let decodedJwt = jwtDecode(token)
      console.log(decodedJwt)
      console.log(request.body)

      if(request.body.userId !== decodedJwt.sub && role !== AdminRole || request.body.todoId !== decodedJwt.todoId && role !== AdminRole){
        return response.status(401).json({ message: "Unauthorized" });
      }

      if(roles.length > 2){
        return response.status(401).json({ message: "Unauthorized" });
      }

      if(!token){
        return response.status(401).json({ error: "token missing or invalid" });
      }

      next()


      // authentication and authorization successful
    }
  ];
};

module.exports = authorize;
