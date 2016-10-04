export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.SwitchCase)
    .forEach(path => {
      if (path.value.consequent[0].type !== 'BlockStatement') {
        j(path).replaceWith(
          j.switchCase(path.value.test, [j.blockStatement(path.value.consequent)])
        );
      }
    })
    .toSource();
}
