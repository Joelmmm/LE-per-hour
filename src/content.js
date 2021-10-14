import React from "react";
import ReactDOM from "react-dom";
import { Tooltip } from "antd";
import 'corejs';


const parseHarvestInfo = memoHarvestInfo();

document.body.addEventListener('click', event => {
  const { target } = event;
  if (target.classList.contains('farm-info')) {
    toggleHarvestInfo(target)
  }
})

document.body.addEventListener('mouseover', event => {
  const { target } = event;
  // parsing 'stat' is bad
  if (target.classList.contains('le') || target.classList.contains('stat')) {
    console.log('Heackcscdc');
    toggleHarvestInfo(target)
  }
})

ReactDOM.render(<Tooltip title='puerba' />, )

function toggleHarvestInfo(target) {
  if (target.dataset.defaultHarvestInfo) {
    target.innerHTML = target.dataset.defaultHarvestInfo;
    target.dataset.defaultHarvestInfo = '';
  } else {
    let content = target.innerHTML.trim()
    target.dataset.defaultHarvestInfo = content;
    target.innerHTML = parseHarvestInfo(content);
  }
}

function memoHarvestInfo() {
  const infoMap = new Map();

  return function (info) {
    if (!info || typeof info !== 'string') return '';

    if (infoMap.has(info)) {
      return infoMap.get(info);
    }

    let dividend = info.replace(/\D/g, ' ').trim();
    let divisor = dividend.slice(dividend.indexOf(' '));
    let quotient = parseInt(dividend) / parseInt(divisor);
    const result = `${quotient.toFixed(2)} LE/hour`;
    // keep result cached.
    infoMap.set(info, result);

    return result
  }
}

console.log('Heeeeey');