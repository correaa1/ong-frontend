

import React from "react";

     const response = await fetch("http://localhost:8080/v1/users",{
     cache:"no-cache"
});
const users = await response.json();
console.log(users);             


const List = async () => {

     return( 
           <div>   Lista geral</div> 
           )
          };
                                     
  
   export default List;