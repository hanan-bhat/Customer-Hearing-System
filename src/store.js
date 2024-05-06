import { reactive, readonly } from 'vue'

// const state = reactive({
//   test: [],
// })

const state = reactive({
  projects: [],
  issues: [],
  notes: [],
})

export default {
  state: readonly(state),
  actions: {
    getAllProjects() {
      const headers = {
        Authorization: 'Bearer glpat-vxtbesvhKa2c8uBsRESs',
      }
      fetch('https://gitlab.com/api/v4/projects?owned=true', {
        headers,
      }).then(async (res) => {
        const response = await res.json()
        state.projects.push(response)
        console.log('STOREEEE', response)
        // console.log(response)
      })
    },
    getIssues(issueLink) {
      state.issues = []
      const headers = {
        Authorization: 'Bearer glpat-vxtbesvhKa2c8uBsRESs',
      }
      fetch(issueLink, {
        headers,
      }).then(async (res) => {
        const response = await res.json()
        state.issues.push(response)
        console.log('ISSSUUEESSSSS STATE', response)
        // console.log(response)
      })
    },
    getNotes(notesLink) {
      state.notes = []
      const headers = {
        Authorization: 'Bearer glpat-vxtbesvhKa2c8uBsRESs',
      }
      fetch(notesLink, {
        headers,
      }).then(async (res) => {
        const response = await res.json()
        state.notes.push(response.reverse())
        // state.notes.push(response.filter((elm) => elm.type !== null))
        // state.issues.push(dataNotNull)
        console.log('ISSSUUEESSSSS Notes', response)
        // console.log(response)
      })
    },
    setNote(comment, projectId, issueIId, issueLink) {
      //   POST /projects/:id/issues/:issue_iid/notes
      const headers = {
        Authorization: 'Bearer glpat-vxtbesvhKa2c8uBsRESs',
        'Content-type': 'application/json; charset=UTF-8',
      }
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
          // state.notes.push(res.json())
        })
        .then(() => this.getNotes(issueLink))

      //   console.log('COMMENTTTTTT API: ', comment, projectId, issueIId)
    },
  },
}
