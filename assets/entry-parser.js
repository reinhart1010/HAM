/**
 * Automatically generate ID names based on the heading name
 * @param {String} name The heading name
 */
function createSectionHeadingId(name){
  var i = 0;
  var finalName = '';
  do {
    finalName = toURI(name);
    if (i > 0) finalName += '-' + i;
    i++;
  } while (document.getElementById(finalName));
  return finalName;
}

/**
 * Scans the first-level attributes of HTML to be included on "On This Page" list
 * @param {Node} originalContent The HTML element containing the original rendered article
 * @param {String} tagline The site tagline
 * @param {Node} onThisPageEntry The HTML element pointing the "On This Page" entry
 */
function parseRawEntry(originalContent, onThisPageEntry, siteTitle, siteTagline){
  var headingTags = ['H2', 'H3', 'H4', 'H5', 'H6'];
  var i, j;
  var taglinePlaced = false;
  var children = originalContent.childNodes;
  var currentAccordionId = '';
  for (i = 0; i < children.length; i++){
    var node = children[i];
    if (node.nodeName == 'H1' && !taglinePlaced && typeof siteTitle === 'string' && siteTitle.length > 0){
      var newTagline = document.createElement('span');
      newTagline.textContent = 'from ' + siteTitle;
      newTagline.className = 'font-size-18 article-sitesub';
      if (typeof siteTagline === 'string' && siteTagline.length > 0){
        newTagline.textContent += ', ' + siteTagline;
      }
      originalContent.insertBefore(newTagline, children[i + 1]);
      taglinePlaced = true;
    }
    if (headingTags.indexOf(node.nodeName) >= 0){
      var currentHeadingLevel = node.nodeName.substring(1,2);
      isInsideAccordion = true;
      if (!node.id) node.id = createSectionHeadingId(node.textContent);
      
      if (node.nodeName === 'H2'){
        currentAccordionId = node.id;
      }

      // Create "On This Page entry"
      var newA = document.createElement('a');
      newA.href = '#' + node.id;
      newA.className = 'sidebar-link text-truncate';
      newA.setAttribute('onclick', 'expandAccordion(\'' + currentAccordionId + '\')');
      for (j = 2; j < currentHeadingLevel; j++){
        var newSpan = document.createElement('span');
        newSpan.className = 'ml-10 d-inline-block';
        newSpan.setAttribute('aria-hidden', true);
        newA.appendChild(newSpan);
      }
      newA.appendChild(document.createTextNode(node.textContent));
      onThisPageEntry.appendChild(newA);
    }
  }
  for (i = 0; i < children.length; i++){
    var node = children[i];
    if (node.nodeName === 'H2'){
      var start = i; end = i;
      var collapseChildren = [];
      while (end + 1 < children.length && children[end + 1].nodeName !== 'H2') end++;
      
      // Mark children
      if (start === end) continue;
      for (j = start + 1; j <= end; end--){
        collapseChildren.push(children[j].cloneNode(true));
        // Mark for deletion
        children[j].remove();
      }
      
      // Create actual collapse
      var newDetails = document.createElement('details');
      newDetails.className = 'collapse-panel w-full _ham_accordion_autoexpand';
      var newSummary = document.createElement('summary');
      newSummary.className = 'collapse-header font-size-20 h2';
      newSummary.innerHTML = node.innerHTML;
      var newDiv = document.createElement('div');
      newDiv.className = 'collapse-content';
      for (j = 0; j < collapseChildren.length; j++) newDiv.appendChild(collapseChildren[j]);
      newDetails.appendChild(newSummary);
      newDetails.appendChild(newDiv);

      newDetails.id = children[i].id;
      children[i].outerHTML = newDetails.outerHTML;
    }
  }
}

var _ham_state_is_all_accordion_collapsed = true;

function autoexpandAccordion(){
  if (window.innerWidth > 768 && _ham_state_is_all_accordion_collapsed === true){
    document.querySelectorAll('._ham_accordion_autoexpand').forEach(function (el){
      el.setAttribute('open', 'true');
    });
    _ham_state_is_all_accordion_collapsed = false;
  } else if (_ham_state_is_all_accordion_collapsed === false){
    document.querySelectorAll('._ham_accordion_autoexpand').forEach(function (el){
      el.removeAttribute('open');
    });
    _ham_state_is_all_accordion_collapsed = true;
  }
}

function expandAccordion(id){
  var el = document.getElementById(id);
  el.setAttribute('open', 'true');
}

window.addEventListener("load", autoexpandAccordion);