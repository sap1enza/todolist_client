import React, { Component } from 'react'

const AppContext = React.createContext()

class AppProvider extends Component {
  state = {
    projects: [],
  }

  setProjects = (projects) => {
    this.setState((prevState) => ({ projects }))
  }

  render() {
    const { children } = this.props
    const { projects } = this.state
    const { setProjects } = this

    return (
      <AppContext.Provider
        value={{
          projects,
          setProjects,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext

export { AppProvider }
