import React from 'react';

/** @param {string} link  */
export const goToLink = link => {
  const a = document.createElement('a');
  a.href = link;
  a.target = 'blank';
  a.click();
};

/** @param {string[]} texts @param {number} brCount */
export const splitByNBrs = (texts, brCount) => (
  <div>
    {texts.map((text, i) => (
      <div key={i}>
        {text}
        {i < texts.length - 1 ? Array(brCount).map(() => <br />) : ''}
      </div>
    ))}
  </div>
);
