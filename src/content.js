const parseHarvestInfo = memoHarvestInfo();

document.body.addEventListener('click', event => {
  const { target } = event;
  if (target.classList.contains('farm-info')) {
    toggleHarvestInfo(target)
  }
})

document.body.addEventListener('mouseover', event => {
  const { target } = event;
  if (target.classList.contains('le')) {
    toggleHarvestInfo(target)
  } else if (target.classList.contains('stat')) {
    const span = target.querySelector('span');
    toggleHarvestInfo(span);
  }
})

// Styles are declared here so they are injected inline for priority. 
const styles = {
  tooltip: {
    height: '0',
    width: '0',
    position: 'relative',
    display: 'inline-block',
    left: '-50%',
    top: '-1rem',
    borderBottom: '1px dotted black',
  },
  tooltipText: {
    width: '120px',
    backgroundColor: 'black',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '6px',
    padding: '5px 0',
    /* Position the tooltip */
    position: 'absolute',
    zIndex: 1,
    bottom: '100%',
    left: '50%',
    marginLeft: '-60px',
  }
}

function toggleHarvestInfo(target) {

  const tooltip = [...(target.children)].find(child => child.classList.contains('tooltip'))
  if (tooltip) {
    tooltip.remove();
    return
  }
  const div = document.createElement('div');
  div.className = 'tooltip';
  addStyles(div, styles.tooltip)

  const span = document.createElement('span');
  span.className = 'tooltiptext';
  addStyles(span, styles.tooltipText)

  let content = target.innerHTML.trim()
  const infoParsed = parseHarvestInfo(content)
  if (!infoParsed) return;
  span.innerHTML = infoParsed

  div.appendChild(span);
  target.appendChild(div);
}

function memoHarvestInfo() {
  const infoMap = new Map();

  return function (info) {
    if (!info || typeof info !== 'string') return '';

    if (infoMap.has(info)) {
      return infoMap.get(info);
    }
    
    let dividend = info.replace(/\D/g, ' ').trim();
    // Regex that checks whether a string follows the pattern of an arbitrary and
    // consecutive number of digits followed by a space and then another arbitrary
    // and consecutive number of digits.
    // "dla 231" false | "123 456" true | "12432354" false
    // Necessary to avoid showing weird stuff. 
    if (!(/^\d+\s\d+$/.test(dividend))) {
      console.error('Extension Error: Cannot parse harvest info.');
      return ''
    }
    let divisor = dividend.slice(dividend.indexOf(' '));
    let quotient = parseInt(dividend) / parseInt(divisor);
    const result = `${quotient.toFixed(2)} LE/hour`;
    // keep result cached.
    infoMap.set(info, result);

    return result
  }
}

function addStyles(elem, styles) {
  for (const style in styles) {
    elem.style[style] = styles[style];
  }
}