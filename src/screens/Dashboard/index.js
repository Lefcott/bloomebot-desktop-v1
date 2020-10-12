import { SECTIONS } from '../../constants';
import React from 'react';
import { useSelector } from 'react-redux';

import Panel from './components/Panel';
import AvailableHacks from './components/AvailableHacks';
import useStyle from './style';

export default function Dashboard() {
  const section = useSelector(store => store.section);
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <div className={classes.pageContent}>
        <Panel />
      </div>
      <div className={classes.sectionContent}>{section === SECTIONS.HACK_LIST && <AvailableHacks />}</div>
    </div>
  );
}
