module.exports = (componentName)=>{
  let content = `<div class="${componentName}-component">
  <p>{{$ctrl.name}} works!</p>
</div>`

  return content;
}
