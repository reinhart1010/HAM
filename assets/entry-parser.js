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
  var originalChildren = originalContent.childNodes;
  var currentAccordionId = '';
  
  var onThisPageEntryDraft = document.createElement('ul');
  onThisPageEntryDraft.className = 'list-group';

  var firstH2 = true;
  var accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion';

  // Scan the content to generate On This Page list and style blockquotes
  for (i = 0; i < originalChildren.length; i++) {
    var node = originalChildren[i];
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
      var newLi = document.createElement('li');
      newLi.className = 'list-group-item';
      var newA = document.createElement('a');
      newA.href = '#' + node.id;
      newA.className = 'nav-link text-truncate';
      newA.setAttribute('onclick', 'expandAccordion(\'' + currentAccordionId + '\')');
      for (j = 2; j < currentHeadingLevel; j++){
        var newSpan = document.createElement('span');
        if (j == currentHeadingLevel - 1) {
          newSpan.className = 'me-1 d-inline-block text-body-tertiary';
          newSpan.textContent = '↳';
        } else {
          newSpan.className = 'ms-3 d-inline-block';
        }
        newSpan.setAttribute('aria-hidden', true);
        newA.appendChild(newSpan);
      }
      newA.appendChild(document.createTextNode(node.textContent));
      newLi.appendChild(newA)
      onThisPageEntryDraft.appendChild(newLi);
    }
    if (node.nodeName == 'BLOCKQUOTE') {
      var blockquoteChildren = node.childNodes;
      node.className = 'alert';
      var firstP = true;
      for (j = 0; j < blockquoteChildren.length; j++) {
        // Support GitHub-style Note, Important, and Warning blockquote style
        if (blockquoteChildren[j].nodeName == 'P' && firstP) {
          switch (blockquoteChildren[j].textContent) {
            case '[!NOTE]':
              node.className += ' alert-primary';
              blockquoteChildren[j].className = ' fs-5 fw-bolder text-primary';
              blockquoteChildren[j].innerHTML = '<i class="bi bi-info-circle"></i> Note';
              break;
            case '[!TIP]':
              node.className += ' alert-success';
              blockquoteChildren[j].className = ' fs-5 fw-bolder text-success';
              blockquoteChildren[j].innerHTML = '<i class="bi bi-lightbulb"></i> Tip';
              break;
            case '[!IMPORTANT]':
              node.className += ' alert-info';
              blockquoteChildren[j].className = ' fs-5 fw-bolder text-info';
              blockquoteChildren[j].innerHTML = '<i class="bi bi-exclamation-diamond"></i> Important';
              break;
            case '[!WARNING]':
              node.className += ' alert-warning';
              blockquoteChildren[j].className = ' fs-5 fw-bolder text-warning';
              blockquoteChildren[j].innerHTML = '<i class="bi bi-exclamation-triangle"></i> Warning';
              break;
            case '[!CAUTION]':
              node.className += ' alert-danger';
              blockquoteChildren[j].className = ' fs-5 fw-bolder text-danger';
              blockquoteChildren[j].innerHTML = '<i class="bi bi-exclamation-octagon"></i> Caution';
              break;
            default:
              node.className += ' alert-secondary';
          }
          firstP = false;
        }
      }
    }
  }

  // Rescan the content to create collapsible headings
  var children = originalContent.cloneNode(true).childNodes;
  for (i = 0; i < children.length; i++){
    var node = children[i];
    if (node.nodeName === 'H2'){
      if (firstH2) {
        // Delete the original children to create a new accordion container
        for (j = i; j < originalChildren.length; j++) originalChildren[j].remove();
        firstH2 = false;
      }

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
      var newDetails = document.createElement('div')
      newDetails.className = 'accordion-item';
      newDetails.id = children[i].id;
      var newSummary = document.createElement('h2');
      newSummary.className = 'accordion-header';
      var newSummaryButton = document.createElement('button');
      newSummaryButton.className = 'accordion-button fs-4';
      newSummaryButton.setAttribute('type', 'button');
      newSummaryButton.setAttribute('data-bs-toggle', 'collapse');
      newSummaryButton.setAttribute('data-bs-target', '#' + children[i].id + "-content");
      newSummaryButton.setAttribute('aria-expanded', 'true');
      newSummaryButton.setAttribute('aria-controls', children[i].id + "-content");
      newSummaryButton.setAttribute('type', 'button');
      newSummaryButton.setAttribute('type', 'button');
      newSummaryButton.innerHTML = node.innerHTML;
      newSummary.appendChild(newSummaryButton);

      var newCollapse = document.createElement('div');
      newCollapse.className = 'accordion-collapse collapse show';
      newCollapse.id = children[i].id + "-content";
      var newBody = document.createElement('div');
      newBody.className = 'accordion-body';
      for (j = 0; j < collapseChildren.length; j++) newBody.appendChild(collapseChildren[j]);
      newCollapse.appendChild(newBody);
      newDetails.appendChild(newSummary);
      newDetails.appendChild(newCollapse);
      accordionContainer.appendChild(newDetails);
    }
  }
  
  originalContent.appendChild(accordionContainer);
  onThisPageEntry.appendChild(onThisPageEntryDraft);
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

async function expandAccordion(id){
  var el = new bootstrap.Collapse(document.getElementById(id + "-content"), {toggle: false});
  await el.show();
}

window.addEventListener("load", autoexpandAccordion);