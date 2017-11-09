module.exports = (moduleName, factoryName)=>{
  let content = `
'use strict';

angular.module('${moduleName}')
  .factory('${factoryName}', ()=>{
      return {
      }
  });
  `;
  return content;
}
