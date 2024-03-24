
  const authMiddleware =(to,from,next)=>{
    const token =localStorage.getItem('token')
    if(!token){
      next({
        path:'/admin'
        // query:{redirect: to.fullPath}
      })
      return
    }
    const tokenExpiration =localStorage.getItem('token_expires')
  
    const tokenExpirationDate= new Date (tokenExpiration);
  
    if(tokenExpirationDate <new Date()){
      next({
        path:'/admin'
      })
      return;
    }
  
    next();
  }

  export default authMiddleware;