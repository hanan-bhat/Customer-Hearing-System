import { reactive, readonly } from 'vue'

const state = reactive({
  projects: [],
  issues: [],
  notes: [],
  user: [],
  loading: false,
})

const headers = {
  Authorization: 'Bearer glpat-vxtbesvhKa2c8uBsRESs',
  'Content-type': 'application/json; charset=UTF-8',
}

export default {
  state: readonly(state),
  actions: {
    getAllProjects() {
      try {
        fetch('https://gitlab.com/api/v4/projects?owned=true', {
          headers,
        }).then(async (res) => {
          const response = await res.json()
          state.projects.push(response)
        })
      } catch (error) {
        console.log(error)
      }
    },
    getUser() {
      try {
        fetch('https://gitlab.com/api/v4/user', {
          headers,
        }).then(async (res) => {
          const response = await res.json()
          state.user.push(response)
        })
      } catch (error) {
        console.log(error)
      }
    },
    getIssues(issueLink) {
      state.issues = []
      try {
        fetch(issueLink, {
          headers,
        }).then(async (res) => {
          const response = await res.json()
          state.issues.push(response)
        })
      } catch (error) {
        console.log(error)
      }
    },
    getNotes(notesLink) {
      state.notes = []
      try {
        fetch(notesLink, {
          headers,
        }).then(async (res) => {
          const response = await res.json()
          state.notes.push(response.reverse())
        })
      } catch (error) {
        console.log(error)
      }
    },
    setNote(comment, projectId, issueIId, issueLink) {
      try {
        state.loading = true
        fetch(
          `https://gitlab.com/api/v4/projects/${projectId}/issues/${issueIId}/notes`,
          {
            headers,
            method: 'POST',
            body: JSON.stringify({
              body: comment,
            }),
          }
        )
          .then(async (res) => {
            res.json()
          })
          .then(() => this.getNotes(issueLink))
      } catch (error) {
        console.log(error)
      } finally {
        state.loading = false
      }
    },
  },
}
