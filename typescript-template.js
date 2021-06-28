// See: https://github.com/gregberge/svgr/issues/473#issuecomment-739082637
function typescriptTemplate(
  {template},
  opts,
  {imports, interfaces, componentName, props, jsx, exports},
) {
  const plugins = ['jsx'];

  if (opts.typescript) {
    plugins.push('typescript');
  }

  const typeScriptTpl = template.smart({plugins});

  const formattedName = `${componentName.name}: React.FC<React.SVGProps<SVGSVGElement>>`;

  return typeScriptTpl.ast`
  import * as React from 'react';

  const ${formattedName} = ${props} => {
    return ${jsx};
  }

  ${exports}
  `;
}

module.exports = typescriptTemplate;
