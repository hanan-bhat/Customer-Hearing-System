import { reactive, readonly } from 'vue'
import { parseYAMLWithoutSpaces } from './utils/yamlDataExtraction'

const state = reactive({
  projects: [],
  issues: [],
  notes: [],
  notesWithEye: [],
  user: [],
  loading: false,
  userParams: {},
})

const headers = {
  Authorization: 'Bearer glpat-vxtbesvhKa2c8uBsRESs',
  'Content-type': 'application/json; charset=UTF-8',
}

export default {
  state: readonly(state),
  actions: {
    async getAllProjects() {
      try {
        await fetch('https://gitlab.com/api/v4/projects?owned=true', {
          method: 'GET',
          headers,
        }).then(async (res) => {
          const response = await res.json()
          state.projects.push(response)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getUser() {
      try {
        await fetch('https://gitlab.com/api/v4/user', {
          method: 'GET',
          headers,
        }).then(async (res) => {
          const response = await res.json()
          state.user.push(response)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getIssues(issueLink) {
      state.issues = []
      try {
        await fetch(issueLink, {
          method: 'GET',
          headers,
        }).then(async (res) => {
          const response = await res.json()
          state.issues.push(response)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getAllIssues() {
      state.issues = []
      try {
        await fetch('https://gitlab.com/api/v4/issues', {
          method: 'GET',
          headers,
        }).then(async (res) => {
          const response = await res.json()
          state.issues.push(response)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getNotes(notesLink) {
      state.notes = []
      try {
        await fetch(notesLink, {
          method: 'GET',
          headers,
        }).then(async (res) => {
          const response = await res.json()
          state.notes.push(response.reverse())
          await response.map((note) =>
            fetch(`${notesLink}/${note.id}/award_emoji`, {
              method: 'GET',
              headers,
            }).then(async (res) => {
              const response = await res.json()
              if (response.length > 0) {
                const noteWithEye = state.notes[0].find(
                  (elm) => elm.id === note.id
                )
                noteWithEye.visible = true
              }
            })
          )
        })
      } catch (error) {
        console.log(error)
      }
    },
    async setNote(comment, projectId, issueIId, issueLink, frontMatter) {
      try {
        state.loading = true
        const checkFrontMatter = parseYAMLWithoutSpaces(frontMatter)
        await fetch(
          `https://gitlab.com/api/v4/projects/${projectId}/issues/${issueIId}/notes`,
          {
            headers,
            method: 'POST',
            body:
              checkFrontMatter.author !== 'undefined' ||
              checkFrontMatter.tenant !== 'undefined'
                ? JSON.stringify({
                    body: `--- ${frontMatter} --- ${comment}`,
                  })
                : JSON.stringify({
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
    setUserParams(project, author, tenant) {
      state.userParams = {}
      state.userParams = {
        project,
        author,
        tenant,
      }
    },
  },
}
