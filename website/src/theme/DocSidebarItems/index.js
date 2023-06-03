import React from 'react';
import DocSidebarItems from '@theme-original/DocSidebarItems';
import Ad from '../../components/Ad';

export default function DocSidebarItemsWrapper(props) {
  return (
    <>
      <DocSidebarItems {...props} />
      <div style={{padding: '2ex 1ex'}}>
        <Ad desktopOnly />
      </div>
    </>
  );
}
