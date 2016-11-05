import React, { Component } from 'react';

import PageTitle from '../../utility/page_title';
import Back from '../../utility/back';
import CopyLink from './copy_link';
import ProjectDetails from './project_details';
import ProjectManagement from './project_management';
import ProjectStats from './project_stats';

export default class ProjectDashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-8 col-center">
          <Back link="/professor-dashboard" />
          <PageTitle title="Project Dashboard: Example Project" />
          <CopyLink />
          <ProjectDetails />
          <ProjectStats />
          <ProjectManagement />
        </div>
      </div>
    );
  }
}
