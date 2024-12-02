const fs = require('fs')
const movies = JSON.parse(fs.readFileSync('./data/movies.json'))

exports.deleteReq = (req,res)=>{
    const id = Number(req.params.id)
 
    const updatedmovie = movies.find((item)=> item.id === id)
    
    
    const index = movies.indexOf(updatedmovie)
 
 
    if(updatedmovie){
 
     movies.splice(index , 1)
       
     fs.writeFile('./data/movies.json' , JSON.stringify(movies) , (err)=>{
         res.status(204).json({
 
             status:"success",
             data:null
             })
     })
 
     }
    
    else{
     res.status(404).json({
         status:"Falied",
         message:"The Value Of Id does not have data"
     })
    }
 }

exports.patchReq  = (req,res)=>{
    const id = Number(req.params.id)
 
    const updatedmovie = movies.find((item)=> item.id === id)
    
    
    const index = movies.indexOf(updatedmovie)
 
 
    const UpadtedMovieObj = Object.assign(updatedmovie , req.body)
 
    movies[index] = UpadtedMovieObj
 
     
    if(updatedmovie){
       
     fs.writeFile('./data/movies.json' , JSON.stringify(movies) , (err)=>{
         res.status(200).json({
             status:"success",
             data:{
                 movies:UpadtedMovieObj
             }
         })
     })
        
    }
    else{
     res.status(404).json({
         status:"Falied",
         message:"The Value Of Id does not have data"
     })
    }
 }

exports.postReq  = (req,res)=>{

    const newID = movies[movies.length - 1].id  + 1
    const newObj = Object.assign({id:newID} , req.body)
    movies.push(newObj)

    fs.writeFile('./data/movies.json' , JSON.stringify(movies) , (err)=>{
              res.status(201).json({
                      status:"success",
                      data:{
                        movies:movies
                      }
              })
    })
    

}

exports.getAllReq = (req,res)=>{
    res.status(200).json({
     status:"success",
     time:req.requestedAt,
     data:{
        movies:movies
     }
    })
 }