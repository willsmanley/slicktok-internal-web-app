/**
 * Sets the HTML document's title and description.
 *
 * Can set one or both at a time.
 *
 * Recommended to use with `useTitleAndDescription` custom hook
 * because you only need to do this 1 time per page load.
 */

export interface TitleAndDescription {
  title?: string;
  description?: string;
  image?: string;
  isArticle?: boolean;
}

const createMetaElement = (property: string, content: string): void => {
  // Try to find and update existing meta element first
  const metaTags = document.getElementsByTagName('meta');
  let foundExistingMetaElement = false;
  for (let i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute('property') === property) {
      metaTags[i].content = content;
      foundExistingMetaElement = true;
      break;
    }
  }

  // Create a new meta element if one doesn't exist yet
  if (!foundExistingMetaElement) {
    const meta = document.createElement('meta');
    meta.setAttribute('property', property);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
};

const setTitleAndDescription = ({
  title,
  description,
  image,
  isArticle = false,
}: TitleAndDescription): void => {
  if (isArticle) {
    createMetaElement('og:type', 'article');
  } else {
    createMetaElement('og:type', 'website');
  }

  if (title) {
    document.title = title;
    createMetaElement('og:title', title);
  }

  if (image) {
    createMetaElement('og:image', image);
    createMetaElement('twitter:image', image);
  }

  // Set description
  if (description) {
    createMetaElement('og:description', description);
    createMetaElement('twitter:description', description);

    // Remove old description
    const oldDescription = document.getElementsByName('description')[0];
    if (oldDescription && oldDescription.parentNode)
      oldDescription.parentNode.removeChild(oldDescription);

    // Add new description
    const newDescription = document.createElement('meta');
    newDescription.name = 'description';
    newDescription.content = description;
    document.head.appendChild(newDescription);
  }
};

export default setTitleAndDescription;
