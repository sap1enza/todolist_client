const getProjects = (async () => {
  let response = await fetch(`http://localhost:3001/projects`);
  const projects = await response.json();
  return projects;
});

export { getProjects };
