const fs = require('fs')
const data =require('./data.json')
const  {age} = require('./util')
const  {date} = require('./util')
//detalhes
exports.show = function(req,res){
  const {id} = req.params

  const foundIstructor = data.instructors.find(function(instructors){
      return id == instructors.id
  })
  if(!foundIstructor) return res.send("Instrutor not found ")

  
  const instructor = {
    ...foundIstructor,
    age: age(foundIstructor.birth),
    service: foundIstructor.service.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundIstructor.created_at)

  }
  return res.render("instructors/show" ,{ instructor : instructor})
}


//post
exports.post = function(req,res){
  const keys= Object.keys(req.body) 
    /*req.body.name =="" */
  for(key of keys){
    console.log(key)
   if(req.body[key] ==""){
     return res.send("Preencha todos os campos")
   }
  }
  let {avatar_url, birth, name, service, gender,sexo}= req.body

  birth  = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)


  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    sexo,
    service,
    created_at,
    gender
  })

 fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
   if(err) return res.send("Erro ao escrever arquivo")
    return res.redirect("/instructors")
 })

}

//edição
exports.edit = function(req,res){
  const {id} = req.params

  const foundIstructor = data.instructors.find(function(instructor){
      return id == instructor.id
  })

  if(!foundIstructor) return res.send("Instrutor not found ")
  const instructor = {
    ...foundIstructor,
    birth:date(foundIstructor.birth)
  }
 

  return res.render("instructors/edit", {instructor : instructor})
}


//update
//delete