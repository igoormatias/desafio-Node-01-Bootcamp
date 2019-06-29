const express = require ('express')

const server = express();

server.use(express.json());



let numberOfRequests = 0;
const projects = [];


/**
 * Middleware que checa se o projeto existe
 */
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

/**
 * Middleware que dá log no número de requisições
 */
function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

/**
 * Projects
 */
server.get('/projects', (req, res) => {
  return res.json(projects);
});
// G E T

server.get('/projects', (req, res) => {
  return res.json(projects);
});

// C R E A T E

server.post('/projects/', (req, res)=>{
  const { id,title } = req.body;

  const project = {
    id,
    title,
    tasks:[]
  }
  projects.push(project)

  return res.json(projects)
})


// Update
server.put('/projects/:id',checkProjectExists,  (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(project);
});
 
// D E L E T E
server.delete('/projects/:id',checkProjectExists, (req, res)=> {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id)
  
  projects.splice(projectIndex, 1)

  return res.send()
})

// C R E A T E   T A S K S
server.post('/projects/:id/tasks',checkProjectExists, (req, res ) =>{
  const { id } = req.params
  const { title } = req.body

  const projectIndex = projects.findIndex(p => p.id === id)

  projects.tasks.push(title);

  return res.json (project)


})





server.listen(3000);
