import { roleSchema } from "./../schema/role.schema";
import { model } from "mongoose";

// creates a Role class with methods for save() / findAll()
const Role = model("Role", roleSchema);
 
//we can add methods to the class

//export the class
export { Role };