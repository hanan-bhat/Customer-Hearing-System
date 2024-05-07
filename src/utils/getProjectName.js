import store from '@/store'

export function getProjectName(projectID) {
  return store.state.projects[0].find((project) => project.id === projectID)
    .name
}
